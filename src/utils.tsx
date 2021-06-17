const delayfunc = (ms, func) => new Promise((resolve, reject) => setTimeout(resolve, ms));
async function selectionSort({ sorting, setsorting, setselected, delay, }: { sorting: number[], setsorting: Function, setselected: Function, delay: number, }) {
    const linearSortnextitter = async (list: number[], x) => {
        const temp = list;
        let max = x, y: number;
        for (let j = x; j < list.length; j++) {
            if (temp[j] > temp[max]) {
                max = j
            }
        }
        y = temp[x]
        temp[x] = temp[max]
        temp[max] = y
        setselected([x, max])
        await delayfunc(delay, () => {
            setsorting(temp)
        })
        return [temp, max]
    }
    for (let i = 0; i < sorting.length; i++) {
        let [x, selectval] = await linearSortnextitter(sorting, i)

    }
}
const bubbleSort = async ({ sorting, setsorting, setselected, delay, }: { sorting: number[], setsorting: Function, setselected: Function, delay: number, }) => {
    const temp = sorting;
    let i = 0, pos = 0;
    do {
        for (let j = 1; j < temp.length - i; j++) {
            if (temp[j - 1] < temp[j]) {
                let x = temp[j - 1];
                temp[j - 1] = temp[j];
                temp[j] = x
                pos = j
                setselected([j - 1, j])
                await delayfunc(20, () => { setsorting(temp) })
            }
        }

        await delayfunc(delay, () => { setsorting(temp) })
        i++
    } while (i < temp.length);

}
const insertionSort = async ({ sorting, setsorting, setselected, delay, }: { sorting: number[], setsorting: Function, setselected: Function, delay: number, }) => {
    let temp = sorting;
    for (let i = 1; i < temp.length; i++) {
        let pos = i, val = temp[i];
        for (let j = i - 1; j >= 0 && val > temp[j]; j--) {
            temp[j + 1] = temp[j]
            pos = j
        }
        temp[pos] = val
        setselected([i, pos])
        await delayfunc(delay, () => { setsorting(temp) })

    }
}

const quickSort = async ({ sorting, setsorting, setselected, delay, }: { sorting: number[], setsorting: Function, setselected: Function, delay: number, }) => {
    let temp = sorting;
    const sort = async (list: number[], l: number, h: number) => {
        if (l < h) {
            let pos = await parition(list, l, h)
            await sort(list, l, pos - 1)
            await sort(list, pos, h)
        }
    }
    const parition = async (list: number[], l: number, h: number) => {
        let i = l, j = h, pivot = list[Math.floor((l + h) / 2)]

        while (i <= j) {
            while (list[i] > pivot) {
                i++
            }
            while (list[j] < pivot) {
                j--
            }
            if (i <= j) {
                let x = list[i]
                list[i] = list[j]
                list[j] = x
                i++;
                j--;
                setselected([i, j])
                await delayfunc(delay, () => {
                    setsorting(list)
                })
            }

        }
        // list[l] = list[i]
        // list[i] = pivot
        // setselected([l, j])
        // await delayfunc(300, () => {
        //     setsorting(list)
        // })
        // setselected([i, j])
        return i
    }
    await sort(temp, 0, temp.length - 1)
}
export default {
    bubbleSort,
    insertionSort,
    selectionSort,
    quickSort
}

