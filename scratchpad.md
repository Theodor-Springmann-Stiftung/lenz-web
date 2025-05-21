TODO
- Überlieferung 
- Nummern weg


- Edition
- Kontakt
- Zitierempfehlung
- Editionrichtlinien mit Legende


<subst><del>gelösche</del><insertion>hinz</insertion></subst>
<tl> text loss
extent bei nr
mouseover hand sidenote 
NOTE ANDERS
-Tab ist falsch

address
align


line
page
tabs
tab
sidenote

aq
del
dul
tl
ul
it
b
ink
inc
pe
nr
er

fn


gr
hb
ru

hand
insertion
subst

Korrekturversion der Lenz-Briefe online
Eine Korrekturversion der Briefe kann jetzt unter https://dev.lenz-briefe.de eingesehen werden. Die Seite aktualisiert sich bei einem push nach https://github.com/Theodor-Springmann-Stiftung/lenz-briefe automatisch, wenn die XML-Syntax gültig ist.
Ein paar Dinge zur Korrektur: 
Grundsätzlich hatte ich schon Probleme mit dem Whitespace, sowohl veritikal, als auch horizontal. In allen XML-Dokumentformaten (wie in TEI) werden Block-Elemente und Inline-Elemente unterschieden. Unser einziges Block-Element ist <sidenote> und zzt. <note>, dass bedeutet, dass vor und nach beiden Elementen automatisch ein Zeilenumbruch stattfindet (sie werden als "block" gesetzt). Fängt man eines von beiden dennoch mit <line> an, gibt es halt einen Zeilenumbruch zu Anfang des Elements:
Bitte nach einem <page>-Tag direkt mit der neuen Seite weiter machen (oder <line>, wenn etwa ein Absatz folgt. Bitte auch keinen Zeilenumbruch nach <page>, sonst gibt es ein unschönes Spatium am Zeilenanfang.
Grundsätzlich sind für mein Gefühl zu viele <line type="empty"/>. Zb vor <sidenote> scheinen sie ein bisschen sinnlos, aber das muss man wohl im Einzelfall beurteilen.
<sidenote> und <hand> müssen nicht mit <note> kommentiert werden, was wirklich oft geschieht. Evtl. lohnt es sich einfach alle <note>-Elemente in der briefe.xml zu suchen, evtl. zu löschen und ggf. durch <hand> oder <sidenote> zu ersetzen. Das kann man ganz ohne Textgrundlage machen, einfach auf Basis dessen, was in der <note> steht:  
Villeicht müssen wir uns für <sidenote> einen anderen Platz ausdenken, als im laufenden Text; evtl am Seitenende in einer zweiten Spalte oder so? 
Dass wir zwischen [added] und <note> unterscheiden, haben wir ja besprochen ([added] sollte selten sein).
Grundsätzlich haben <note> ein bisschen das Problem, dass sie sich nicht wirklich auf etwas beziehen, bzw. der Bezug oft unklar ist. Am liebsten würde mir so etwas wie <edit> und <editreason> aus der Hamann-Ausgabe besser gefallen. Dort ist note durch den rigiden Zeilenfall nicht so sehr das Problem.
 
 
