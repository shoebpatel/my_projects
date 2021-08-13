// var input_stdin_array = ['2', '3', '11', '23', '24', '28', '35', '1'];

function minOperations(arr1, arr2, i, j, n) {
    // Base Case
    let f = 0;
    for (let i = 0; i < n; i++) {
        if (arr1[i] != arr2[i])
            f = 1;
        break;
    }

    if (f == 0)
        return 0;

    if (i >= n || j >= n)
        return 0;

    // If arr[i] < arr[j]
    if (arr1[i] < arr2[j])
        // Include the current element
        return 1 + minOperations(arr1, arr2, i + 1, j + 1, n);

    // Otherwise, excluding the current element
    return Math.max(minOperations(arr1, arr2, i, j + 1, n), minOperations(arr1, arr2, i + 1, j, n));
}

// Function that counts the minimum
// moves required to sort the array
function minOperationsUtil(arr, n) {
    let brr = new Array(n);

    for (let i = 0; i < n; i++)
        brr[i] = arr[i];

    brr.sort();
    let f = 0;

    // If both the arrays are equal
    for (let i = 0; i < n; i++) {
        if (arr[i] != brr[i])

            // No moves required
            f = 1;
        break;
    }

    // Otherwise
    if (f == 1)

        // Print minimum
        // operations required
        // minOperations(arr, brr, 0, 0, n);
        console.log('minOperations(arr, brr, 0, 0, n): ', minOperations(arr, brr, 0, 0, n));
    else
        console.log('-1');
}

// Driver code
let arr = [4, 7, 2, 3, 9];
let n = arr.length;

minOperationsUtil(arr, n);



// * ============================================================================================================

function minMoves(arr, n) {
    // Since we traverse array from end,
    // extected item is initially n
    let expectedItem = n;

    // Taverse array from end
    for (let i = n - 1; i >= 0; i--) {
        // If current item is at its
        // correct position, decrement
        // the expectedItem (which also
        // means decrement in minimum
        // number of moves)
        if (arr[i] == expectedItem)
            expectedItem--;
    }

    return expectedItem;
}

let arr = [4, 3, 2, 1];
let n = arr.length;

console.log('minMoves(arr, n): ', minMoves(arr, n));


// * ============================================================================================================





