# BlogPage
von David Langner und Tarek Bürner
## Accesibility
### Was bedeutet Accessibility im Kontext der Webentwicklung? 
Accessibility (Barrierefreiheit) in der Webentwicklung bezieht sich darauf, Websites und Webanwendungen so 
zu gestalten und zu entwickeln, dass sie für alle Menschen zugänglich sind, unabhängig von ihren individuellen 
Fähigkeiten oder Einschränkungen. Das vorrangige Ziel ist es, eine inklusive Online-Erfahrung zu schaffen, bei 
der niemand aufgrund von körperlichen, kognitiven oder technischen Hindernissen ausgeschlossen wird. Jede*r 
Nutzer*in soll die gleichen Informationen und Dienstleistungen gleichermaßen nutzen können. 
 
Um diese Barrierefreiheit zu erreichen, ist es von entscheidender Bedeutung, dass Entwicklerinnen und 
Entwickler auf semantische HTML-Codes setzen, die die Struktur und Bedeutung der Inhalte klar definieren. 
Eine sorgfältige Wahl der HTML-Elemente ermöglicht es Benutzern von Screenreadern und anderen 
Assistenztechnologien, den Inhalt besser zu verstehen und effektiv zu navigieren. 
 
Des Weiteren ist die Bereitstellung alternativer Texte für Bilder ein wesentlicher Bestandteil der 
Barrierefreiheit. Durch die Angabe von aussagekräftigen Alt-Texten erhalten Benutzer mit Seheinschränkungen 
eine klare Beschreibung des Bildinhalts, auch wenn das Bild selbst nicht angezeigt wird. Dies gewährleistet, 
dass die Website für alle Nutzer*innen zugänglich ist. 
 
Ein weiterer Aspekt der Accessibility betrifft die Gestaltung von Farben und Kontrasten. Die Wahl von gut 
erkennbaren Farbpaletten und ausreichendem Kontrast zwischen Text und Hintergrund verbessert die 
Lesbarkeit und Nutzbarkeit der Website, insbesondere für Menschen mit Sehbeeinträchtigungen. Indem diese 
Aspekte berücksichtigt werden, wird die visuelle Erfahrung für alle Besucherinnen und Besucher angenehmer. 
 
Zusätzlich zur Beachtung der visuellen Aspekte sollte eine barrierefreie Website auch auf verschiedene 
Bildschirmgrößen und Geräte reagieren können. Eine responsive Gestaltung stellt sicher, dass die Inhalte auf 
mobilen Geräten genauso zugänglich sind wie auf Desktop-Computern. 
 
Accessibility ist nicht nur eine moralische Verpflichtung, sondern auch gesetzlich vorgeschrieben, da viele 
Länder spezifische Richtlinien und Gesetze zur Barrierefreiheit haben. Unternehmen und Organisationen, die 
eine barrierefreie Website bereitstellen, demonstrieren ihr Engagement für soziale Verantwortung und 
Gleichberechtigung. Darüber hinaus profitieren sie von einem erweiterten Publikum und einem klaren 
Wettbewerbsvorteil. 
 
Insgesamt ist Accessibility in der Webentwicklung ein bedeutsamer Schritt, um sicherzustellen, dass das 
Internet für alle zugänglich ist und eine inklusive digitale Welt geschaffen wird. Es ist eine bedeutende 
Maßnahme, um sicherzustellen, dass Informationen und Dienstleistungen für alle Menschen zugänglich sind, 
unabhängig von ihren individuellen Fähigkeiten oder technischen Voraussetzungen.

### Accessibility am Beispiel unserer Website
Bei der Gestaltung der Webanwendung wurde besonderes Augenmerk auf die Umsetzung von Accessibility (Barrierefreiheit) gelegt, um sicherzustellen, dass die Website für alle Nutzerinnen und Nutzer zugänglich und benutzbar ist, unabhängig von ihren individuellen Fähigkeiten oder technischen Voraussetzungen.

Ein wesentlicher Schritt in dieser Richtung war die Verwendung semantisch sinnvoller HTML-Code-Elemente. Dabei wurde darauf geachtet, dass die Elemente in der Navigationsleiste im dafür vorgesehenen `<nav>`-Element stehen, Artikel im `<article>`-Tag eingefügt wurden und die Struktur des Inhalts durch `<sections>`, `<h>`, `<header>` und `<footer>` klar definiert wurde. Dadurch wird nicht nur die visuelle Darstellung verbessert, sondern auch Benutzern von Screenreadern und anderen Assistenztechnologien eine bessere Verständlichkeit und Navigation ermöglicht.

Ein weiterer bedeutender Schwerpunkt lag auf der angemessenen Verwendung von Alternativtexten für Bilder. Für jedes verwendete Bild wurden relevante und aussagekräftige Alt-Texte bereitgestellt. Auf diese Weise können auch Nutzerinnen und Nutzer mit Seheinschränkungen den Kontext und die Bedeutung der Bilder verstehen, selbst wenn diese nicht sichtbar sind.

Um die Lesbarkeit und Benutzbarkeit für alle Besucherinnen und Besucher zu gewährleisten, wurde hohe Kontraste zwischen Text und Hintergrund in der Farbwahl berücksichtigt. Dadurch wird der Text gut lesbar, insbesondere für Menschen mit Sehbeeinträchtigungen.

Ein weiterer Fokus lag auf der Implementierung einer Tastaturnavigation, um die Accessibility der Website zu verbessern. Durch diese Maßnahme wird es Benutzerinnen und Benutzern ermöglicht, die Website vollständig und effizient ohne die Verwendung einer Maus zu navigieren. Besonders hervorzuheben ist die Integration einer Suchfunktion, die durch die Betätigung der Enter-Taste bestätigt werden kann. Dadurch wird gewährleistet, dass auch Personen, die aus verschiedenen Gründen keine Maus verwenden können, die Website problemlos nutzen können.

Zusätzlich zu den visuellen Hinweisen durch Farbcodierung wurden Icons wie eine Mülltonne oder ein Stift eingefügt, um Funktionen und Inhalte zu kennzeichnen. Dies stellt sicher, dass auch farbenblinde Menschen die Website ohne Einschränkungen nutzen können und keine wichtigen Informationen oder Funktionen aufgrund der Farbgestaltung übersehen.

Durch die konsequente Umsetzung dieser Accessibility-Maßnahmen wurde eine barrierefreie Website geschaffen, die allen Nutzern und Nutzerinnen eine inklusive und angenehme Online-Erfahrung bietet. Die Website steht allen offen und erfüllt die Anforderungen einer vielfältigen Zielgruppe, indem sie gleichermaßen benutzerfreundlich und zugänglich für alle ist.
## Zu beachtende Punkte bei unserer WebsiteB
- es dauert manchmal ein bisschen Zeit, bis alles von der API gepulled wurde