export const isEqualObjects = (object1, object2) => {
    if (object1 === object2) {
        return true
    }

    if (
        typeof object1 !== 'object' || object1 === null ||
        typeof object2 !== 'object' || object2 === null
    ) {
        return false
    }

    const stack = [{ object1, object2 }]
    const visited = new WeakMap()

    while (stack.length > 0) {
        const { object1, object2 } = stack.pop()

        if (object1 === object2) {
            continue
        }

        if (
            typeof object1 !== 'object' || object1 === null ||
            typeof object2 !== 'object' || object2 === null
        ) {
            return false
        }

        if (visited.has(object1) && visited.get(object1).has(object2)) {
            continue
        }

        if (!visited.has(object1)) {
            visited.set(object1, new WeakSet())
        }

        visited.get(object1).add(object2)

        if (!visited.has(object2)) {
            visited.set(object2, new WeakSet())
        }

        visited.get(object2).add(object1)

        const isArray1 = Array.isArray(object1)
        const isArray2 = Array.isArray(object2)

        if (isArray1 !== isArray2) {
            return false
        }

        if (isArray1) {
            if (object1.length !== object2.length) {
                return false
            }

            for (let i = 0; i < object1.length; i++) {
                stack.push({ object1: object1[i], object2: object2[i] });
            }
        } else {
            const keys1 = Object.keys(object1)
            const keys2 = Object.keys(object2)

            if (keys1.length !== keys2.length) {
                return false
            }

            for (const key of keys1) {
                if (!(key in object2)) {
                    return false
                }

                stack.push({ object1: object1[key], object2: object2[key] })
            }
        }
    }

    return true
}

export const isEmptyObject = (object) => {
    return object == null ||
        typeof object !== 'object' ||
        Object.keys(object).length === 0
}
