### Verbesserung der linearen Suche

# 1. Vestehe die Ineffizienz
    - Die lineare Suchfunktion erhält zwei Parameter, "data" und "target". Data ist der Array, target der Begriff, der gesucht wird. Sobald der target-Begriff mit dem gerade analysierten Element des Arrays übereinstimmt, gibt die Schleife die Stelle aus, an der sich der Suchbegriff im Array befindet. Wenn der Suchbegriff im Array nicht existiert, wird -1 zurückgegeben
    - Sobald der Datensatz größer wird, könnte die Funktion sehr lange brauchen, da sie von 0 bis theoretisch unendlich hochzählen muss. Jede Verdopplung der Array-Größe bedeutet eine Verdopplung der Zeit.

# 2. Implementiere eine effizientere Suche
    - Ich würde hier binary search implementieren, weil es ein logarithmischer Zeit-Algo ist. Das heißt: Je größer der Datensatz, desto schneller werde ich mit der binären Suche im Gegensatz zur linearen.

    function binarySearch(data, target) {
        let left = 0;
        let right = data.length - 1;

        while(left <= right ) {
            const mid = Math.floor((left + right) / 2);
            if(data[mid] === target) {
                return mid;
            } else if(data[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }

    - Im Testfile kann man sehen: Je größer der Datensatz, desto schneller wird der binäre Algorithmus. Als Beispiel: arr3 hat 10000 Elemente. Wenn ich die Zahl 5000 suche, dann benötigt der lineare Algo 0,229ms, während der binäre nur 0,103ms benötigt. Es ist allerdings auch so, dass der lineare schneller ist, wenn die gesuchte Zahl relativ klein ist. Wenn ich etwa das target auf 50 setze, dann ist der lineare Algo nach 0,035ms fertig, der binäre braucht immerhin 0,088ms. 