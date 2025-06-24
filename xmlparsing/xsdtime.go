package xmlparsing

import (
	"errors"
	"fmt"
	"math"
	"strconv"
)

// An implementation of the xsd 1.1 datatypes:
// date, gDay, gMonth, gMonthDay, gYear, gYearMonth.

type XSDDatetype int
type Seperator byte

const (
	DEFAULT_YEAR  = 0
	DEFAULT_DAY   = 1
	DEFAULT_MONTH = 1

	MIN_ALLOWED_NUMBER = 0x30 // 0
	MAX_ALLOWED_NUMBER = 0x39 // 9
	SIGN               = 0x2D // -
	SEPERATOR          = 0x2D // -
	PLUS               = 0x2B // +
	COLON              = 0x3A // :
	TIMEZONE           = 0x5A // Z
	NONE               = 0x00 // 0
)

const (
	Unknown XSDDatetype = iota
	Invalid
	Date
	GDay
	GMonth
	GYear
	GMonthDay
	GYearMonth
)

type XSDDate struct {
	base []byte

	Year  int
	Month int
	Day   int

	hasTimezone bool
	hasYear     bool
	hasMonth    bool
	hasDay      bool

	TZH int
	TZM int

	state XSDDatetype
	error bool

	// INFO: XSD Date Datatypes typically describe a duration in the value space.
	// TimeError  bool
	// BaseTime     time.Time
	// BaseDuration time.Duration
}

// Sanity check:
// MONTH DAY + Date: Sanity check Month and Day. Additional checks:
//		- Month: 2 - Day < 30
// 		- Month: 4, 6, 9, 11 - Day < 31
// 		- Month: 1, 3, 5, 7, 8, 10, 12 - Day < 32
// YEAR + Date: Sanity check Year + February 29. Check zero padding.
// Additional checks:
//		- Feb 29 on leap years: y % 4 == 0 && (y % 100 != 0 || y % 400 == 0)
//		-> Check last 2 digits: if both are zero, check first two digits.
//			 Else if last digit is n % 4 == 0, the second to last digit m % 2 == 0
//			 Else if last digit is n % 4 == 2, the second to last digit m % 2 == 1
//			 Else its not a leap year.
//		- no 0000 Year
//

func New(s string) (XSDDate, error) {
	dt := XSDDate{base: []byte(s)}
	err := dt.Parse(dt.base)
	return dt, err
}

func (d XSDDate) String() string {
	var s string
	if d.Year != 0 {
		s += fmt.Sprintf("%d", d.Year)
	}

	if d.Month != 0 {
		if d.Year == 0 {
			s += "-"
		}
		s += fmt.Sprintf("-%02d", d.Month)
	}

	if d.Day != 0 {
		if d.Year == 0 && d.Month == 0 {
			s += "--"
		}
		s += fmt.Sprintf("-%02d", d.Day)
	}

	if d.hasTimezone {
		if d.TZH == 0 && d.TZM == 0 {
			s += "Z"
		} else {
			sep := "+"
			hint := d.TZH
			if hint < 0 {
				sep = "-"
				hint *= -1
			}
			h := fmt.Sprintf("%02d", hint)

			s += fmt.Sprintf("%v%v:%02d", sep, h, d.TZM)
		}
	}

	return s
}

func (d *XSDDate) UnmarshalText(text []byte) error {
	return d.Parse(text)
}

func (d XSDDate) MarshalText() ([]byte, error) {
	return []byte(d.String()), nil
}

func (xsdd *XSDDate) Parse(s []byte) error {
	xsdd.base = s

	// The smallest possible date is 4 chars long
	if len(s) < 4 {
		return xsdd.parseError("Date too short")
	}

	// Check for Z, then check for timezone
	if len(s) >= 5 && s[len(s)-1] == TIMEZONE {
		xsdd.hasTimezone = true
		s = s[:len(s)-1]
	} else if len(s) >= 10 {
		err := xsdd.parseTimezone(s[len(s)-6:])
		if err == nil {
			s = s[:len(s)-6]
		}
	}

	// Year
	if s[1] != SEPERATOR {
		i := 3
		for ; i < len(s); i++ {
			if s[i] < MIN_ALLOWED_NUMBER || s[i] > MAX_ALLOWED_NUMBER {
				break
			}
		}

		yint, err := Btoi(s[:i])
		if err != nil {
			return xsdd.parseError(fmt.Sprintf("Invalid year: %v", s[:i]))
		}
		xsdd.Year = yint
		xsdd.hasYear = true

		if i == len(s) {
			return nil
		}

		s = s[i+1:]
	} else {
		s = s[2:]
	}

	// Left are 02 (Month), -02 (Day), 02-02 (Date)
	if s[0] != SEPERATOR {
		mstr := s[:2]
		mint, err := Btoi(mstr)
		if err != nil {
			return xsdd.parseError(fmt.Sprintf("Invalid month: %v", mstr))
		}

		xsdd.Month = mint
		xsdd.hasMonth = true
		s = s[2:]
		if len(s) == 0 {
			return nil
		} else if len(s) != 3 || s[0] != SEPERATOR {
			return xsdd.parseError(fmt.Sprintf("Invalid date ending: %v", s))
		}
	}

	s = s[1:]

	// Left is 02 Day
	dint, err := Btoi(s)
	if err != nil {
		return xsdd.parseError(fmt.Sprintf("Invalid day: %v", s))
	}

	// INFO: We do not check len here, it is handled above
	xsdd.Day = dint
	xsdd.hasDay = true

	return nil
}

var WD_CALC_MATRIX = []int{0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4}

func (xsdd XSDDate) Weekday() int {
	y := xsdd.Year
	if xsdd.Month < 3 {
		y--
	}
	return (y + y/4 - y/100 + y/400 + WD_CALC_MATRIX[xsdd.Month-1] + xsdd.Day) % 7
}

func (xsdd XSDDate) Base() []byte {
	return xsdd.base
}

func (xsdd XSDDate) Type() XSDDatetype {
	if xsdd.state == Unknown {
		_ = xsdd.Validate()
	}

	return xsdd.state
}

func (xsdd *XSDDate) Validate() bool {
	if xsdd.error || len(xsdd.base) == 0 {
		xsdd.state = Invalid
		return false
	}

	xsdd.state = xsdd.inferState()
	if xsdd.state == Invalid {
		return false
	}

	return true
}

func (xsdd *XSDDate) parseError(s string) error {
	xsdd.error = true
	xsdd.state = Invalid
	return errors.New(s)
}

func (xsdd *XSDDate) parseTimezone(s []byte) error {
	// INFO: We assume the check for 'Z' has already been done
	if len(s) != 6 || s[3] != COLON || (s[0] != PLUS && s[0] != SIGN) {
		return fmt.Errorf("Invalid timezone")
	}

	h, err := Btoi(s[:3])
	if err != nil {
		return fmt.Errorf("Invalid hour: %v", s[:3])
	}

	m, err := Btoi(s[4:])
	if err != nil {
		return fmt.Errorf("Invalid minute: %v", s[4:])
	}

	xsdd.hasTimezone = true
	xsdd.TZH = h
	xsdd.TZM = m

	return nil
}

func (xsdd XSDDate) inferState() XSDDatetype {
	if xsdd.hasYear && xsdd.hasMonth && xsdd.hasDay {
		if !validDayMonthYear(xsdd.Year, xsdd.Month, xsdd.Day) {
			return Invalid
		}
		return Date
	} else if xsdd.hasYear && xsdd.hasMonth {
		if !validMonth(xsdd.Month) || !validYear(xsdd.Year) {
			return Invalid
		}
		return GYearMonth
	} else if xsdd.hasMonth && xsdd.hasDay {
		if !validDayMonth(xsdd.Day, xsdd.Month) {
			return Invalid
		}
		return GMonthDay
	} else if xsdd.hasYear {
		if !validYear(xsdd.Year) {
			return Invalid
		}
		return GYear
	} else if xsdd.hasMonth {
		if !validMonth(xsdd.Month) {
			return Invalid
		}
		return GMonth
	} else if xsdd.hasDay {
		if !validDay(xsdd.Day) {
			return Invalid
		}
		return GDay
	}

	return Invalid
}

func (xsdd XSDDate) Before(other XSDDate) bool {
	if xsdd.Year < other.Year {
		return true
	} else if xsdd.Year > other.Year {
		return false
	}

	if xsdd.Month < other.Month {
		return true
	} else if xsdd.Month > other.Month {
		return false
	}

	if xsdd.Day < other.Day {
		return true
	}

	return false
}

func (xsddate *XSDDate) Compare(other *XSDDate) int {
	if !xsddate.Validate() {
		return -1
	}

	if !other.Validate() {
		return 1
	}

	if xsddate.Year < other.Year {
		return -1
	} else if xsddate.Year > other.Year {
		return 1
	}

	if xsddate.Month < other.Month {
		return -1
	} else if xsddate.Month > other.Month {
		return 1
	}

	if xsddate.Day < other.Day {
		return -1
	} else if xsddate.Day > other.Day {
		return 1
	}

	return 0
}

func validDay(i int) bool {
	if i < 1 || i > 31 {
		return false
	}

	return true
}

func validMonth(i int) bool {
	if i < 1 || i > 12 {
		return false
	}

	return true
}

func validYear(i int) bool {
	if i == 0 {
		return false
	}

	return true
}

func validDayMonth(d int, m int) bool {
	if !validDay(d) || !validMonth(m) {
		return false
	}

	if m == 2 {
		if d > 29 {
			return false
		}
	} else if m == 4 || m == 6 || m == 9 || m == 11 {
		if d > 30 {
			return false
		}
	}

	return true
}

func validDayMonthYear(y int, m int, d int) bool {
	if !validDay(d) || !validMonth(m) || !validYear(y) {
		return false
	}

	if m == 2 {
		if d == 29 {
			if y%4 == 0 && (y%100 != 0 || y%400 == 0) {
				return true
			}

			return false
		}
	}

	return true
}

var ErrNoNumber = errors.New("Byte input is NaN")
var ErrOverflow = errors.New("Byte input overflows int")

// INFO: converts ASCII []byte to the integer represented by the string w/o alloc.
func Btoi(bs []byte) (int, error) {
	l := len(bs)
	if l == 0 {
		return 0, ErrNoNumber
	}

	// slow path for large numbers (-> strconv.Atoi):
	if strconv.IntSize == 32 && l > 9 || strconv.IntSize == 64 && l > 18 {
		i, err := strconv.ParseInt(string(bs), 10, 64)
		if err != nil {
			return 0, err
		}

		if strconv.IntSize == 32 {
			if i > int64(math.MaxInt32) || i < int64(math.MinInt32) {
				return 0, ErrOverflow
			}
		} else {
			if i > int64(math.MaxInt64) || i < int64(math.MinInt64) {
				return 0, ErrOverflow
			}
		}

		return int(i), nil
	}

	var ret int
	m := false
	if bs[0] == '+' {
		bs = bs[1:]
	} else if bs[0] == '-' {
		bs = bs[1:]
		m = true
	}

	for _, b := range bs {
		if b < '0' || b > '9' {
			return 0, ErrNoNumber
		}

		ret = ret*10 + int(b-'0')
	}

	if m {
		ret *= -1
	}

	return ret, nil
}
