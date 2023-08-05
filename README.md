# BlogPage
## Accesibility
### Was bedeutet Accessibility im Kontext der Webentwicklung? 
Accessibility (Barrierefreiheit) in der Webentwicklung bezieht sich darauf, Websites und Webanwendungen so zu gestalten und zu entwickeln, dass sie für alle Menschen zugänglich sind, unabhängig von ihren individuellen Fähigkeiten oder Einschränkungen. Das Ziel ist es, eine Online-Erfahrung zu schaffen, bei der niemand ausgeschlossen wird und alle Nutzerinnen und Nutzer die gleichen Informationen und Dienstleistungen gleichermaßen nutzen können.

Dies erfordert die Verwendung semantischer HTML-Codes, um die Struktur und Bedeutung der Inhalte klar zu definieren, die Bereitstellung alternativer Texte für Bilder, die Verwendung von Untertiteln und Transkripten für Videos, die Gestaltung von gut erkennbaren Farben und Kontrasten sowie die Anpassung an verschiedene Bildschirmgrößen und Geräte.

Accessibility ist nicht nur eine ethische Verpflichtung, sondern auch gesetzlich vorgeschrieben, da viele Länder Richtlinien zur Barrierefreiheit haben. Unternehmen und Organisationen, die barrierefreie Websites bereitstellen, zeigen nicht nur ihr Engagement für soziale Verantwortung und Gleichberechtigung, sondern erreichen auch eine größere Zielgruppe. Somit ist Accesability nicht nur ein MIttel zum Zweck sondern schafft auch einen klaren Wettebwerbsvorteil.

Insgesamt ist Accessibility in der Webentwicklung ein wichtiger Schritt, um sicherzustellen, dass das Internet für alle zugänglich ist und eine inklusive digitale Welt zu schaffen. Es ist eine bedeutende Maßnahme, um sicherzustellen, dass Informationen und Dienstleistungen für alle Menschen zugänglich sind, unabhängig von ihren individuellen Fähigkeiten oder technischen Voraussetzungen.


### Accessibility am Beispiel unserer Website
Beim Gestalten der Webanwendung wurde darauf geachtet, semantisch sinnvollen HTML-Code zu entwickeln. Als Beispiele hierfür ist aufzuführen, dass die Elemente in der Navigationsleiste in dem dafür vorgesehenen `<nav>`-Element stehen. Ebenso wurden Artikel im `<article>`-Tag eingefügt, um die Struktur des Inhalts klarer zu definieren. Das gleiche Prinzip wurde auch bei der Verwendung von `<sections>`, `<h>`, `<header>` und `<footer>` angewendet, um die semantische Bedeutung jedes Abschnitts der Website zu verdeutlichen. Durch diese sinnvolle Strukturierung des HTML-Codes wird es Benutzern von Screenreadern und anderen Assistenztechnologien ermöglicht, den Inhalt besser zu verstehen und die Navigation erleichtert.

Ein weiterer wichtiger Aspekt der Accessibility ist die richtige Verwendung von Alternativtexten für Bilder. Bei verwendeten Bildern wurde der entsprechende Inhalt im alt-Text angegeben. Dadurch wird sichergestellt, dass die Webseite auch von Benutzern mit Screenreadern korrekt interpretiert werden kann und sie so den Kontext der Bilder verstehen können, selbst wenn diese nicht angezeigt werden.

Darüber hinaus wurde bei der Farbwahl auf hohe Kontraste zwischen Text und Hintergrund geachtet. Ein ausreichender Kontrast gewährleistet, dass der Text leicht lesbar ist, insbesondere für Personen mit Sehbeeinträchtigungen. Dadurch wird die Lesbarkeit und Benutzbarkeit der Webseite für alle Besucher verbessert.

Um die Accessibility zusätzlich zu steigern, wurde auch darauf geachtet, dass die Bedienung der Webseite auch ausschließlich mit der Tastatur möglich ist. Dazu wurde beispielsweise die Funktion ergänzt, dass eine Suche mit der Enter-Taste bestätigt werden kann. Dies stellt sicher, dass Benutzer, die aus verschiedenen Gründen keine Maus verwenden können, die Webseite vollständig und effizient nutzen können.

Ein weiterer Schwerpunkt lag auf der klaren Darstellung von Funktionen und Inhalten, unabhängig von der Farbwahrnehmung der Benutzer. Anstatt sich ausschließlich auf Farbcodierung zu verlassen, wurden immer zusätzlich zu den entsprechenden Farben auch Icons wie eine Mülltonne oder ein Stift eingefügt, um die Funktionen zu kennzeichnen. Dadurch wird sichergestellt, dass auch farbenblinde Menschen die Webseite ohne Einschränkungen nutzen können und keine wichtigen Informationen oder Funktionen aufgrund der Farbgestaltung übersehen.
## Zu beachtende Punkte bei unserer Website
- es dauert manchmal ein bisschen Zeit, bis alles von der API gepulled wurde