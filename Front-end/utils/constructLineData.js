const constructLineData = (weeklyTransactions) => {
    // stage-1 ==> format days coming from db
    const objOfLineData = weeklyTransactions.reduce((total, transaction) => {
        const dayDate = transaction.createdAt.slice(0, 10);
        if (!total[dayDate])
            total[dayDate] = { label: dayDate, value: Number(transaction.totalPrice) };

        else
            total[dayDate] = { label: dayDate, value: total[dayDate].value + Number(transaction.totalPrice) };

        return total;
    }, {});

    // sort days which come from stage-1
    let values = sortValues(Object.values(objOfLineData)); // [{label: '2023-09-04', value: 1255}, ...]

    // stage-2 ==> test if stage-1 return days less than 7 days and if is true, complete them to 7 days
    Array.from({ length: 7 }).map((_, i) => {
        // to complete chart to 7 days
        const isExistDate = new Date(new Date().setDate(new Date().getDate() - 6 + i)).toJSON().slice(0, 10)

        if (!objOfLineData[isExistDate]) {
            values.push({ label: isExistDate, value: 0 })
            objOfLineData[isExistDate] = { label: isExistDate, value: 0 };
        }
    }
    );

    // sort again
    values = sortValues(values);
    console.log(values);

    values = values.map(obj => {
        return {
            label: new Date(obj.label).toLocaleString('default', { weekday: 'long' }).slice(0, 3),
            value: obj.value
        }
    })

    return values; // [{label: 'Mon', value: 2000}, {label: 'Thu', value: 5000}, ...]
}

function sortValues(values) {
    return values.sort((d1, d2) => new Date(d1.label) - new Date(d2.label));
}

export default constructLineData
