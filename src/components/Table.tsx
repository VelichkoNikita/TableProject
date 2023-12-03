import React, { useEffect, useState } from 'react';
import classes from './Table.module.scss';
import { Row } from './ui/Row/index';
import { Filter } from './ui/Filter/index';
import { Sort } from './ui/Sort/index';
import DATA from '../DATA.json'

export interface IRow {
    id: number
    parentId?: number
    isActive?: boolean,
    balance?: string | number | object,
    name?: string,
    email?: string,
}

const Table = () => {
    let data = DATA
    const [tableData, setTableData] = useState<IRow[] | []>([])
    const [isResetedFilter, setIsResetedFilter] = useState<boolean>(false)
    const [balanceValue, setBalanceValue] = useState<string | number>()
    const [nameValue, setNameValue] = useState<string>()
    const [emailValue, setEmailValue] = useState<string>()

    useEffect(() => {
        setTableData(data)
    }, [])


    useEffect(() => {
        setTableData(data)
    }, [isResetedFilter])

    return (
        <div className={classes.mainWrapper}>
            <h1>Таблица</h1>
            <h5>Фильтры:</h5>
            <Filter
                setBalanceValue={setBalanceValue}
                setNameValue={setNameValue}
                setEmailValue={setEmailValue}
                setTableData={setTableData}
                setIsResetedFilter={setIsResetedFilter}
                balanceValue={balanceValue}
                nameValue={nameValue}
                isResetedFilter={isResetedFilter}
                emailValue={emailValue}
                tableData={tableData}
            />
             <h5>Сортировка:</h5>
            <Sort
                tableData={tableData}
                setTableData={setTableData}
                setIsResetedFilter={setIsResetedFilter}
                isResetedFilter={isResetedFilter}
            />
            <Row
                tableData={tableData}
            />
        </div>
    );
};

export default Table;
