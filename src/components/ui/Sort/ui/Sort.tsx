import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { IRow } from 'src/components/Table';
import classes from './Sort.module.scss';

interface SortProps {
    tableData: IRow[];
    setTableData: Dispatch<SetStateAction<IRow[] | []>>
    setIsResetedFilter: Dispatch<SetStateAction<boolean>>
    isResetedFilter: boolean
}
 interface IRowBalanceNum {
    id: number
    parentId?: number
    isActive?: boolean,
    balance: number,
    name?: string,
    email?: string,
}

export const Sort: FC<SortProps> = ({ tableData, setTableData, isResetedFilter, setIsResetedFilter }) => {
    const [showToolTipActive, setShowToolTipActive] = useState<boolean>(false)
    const [showToolTipBalance, setShowToolTipBalance] = useState<boolean>(false)
    const [showToolTipName, setShowToolTipName] = useState<boolean>(false)
    const [showToolTipEmail, setShowToolTipEmail] = useState<boolean>(false)

    const sortByText = (tableData: IRow[], category: string) => {

        const nameAscending = [...tableData].sort((a, b) =>
            a.name > b.name ? 1 : -1,
        )
        const nameDescending = [...tableData].sort((a, b) =>
            a.name > b.name ? -1 : 1,
        )
        const emailDescending = [...tableData].sort((a, b) =>
            a.email > b.email ? -1 : 1,
        )
        const emailAscending = [...tableData].sort((a, b) =>
            a.email > b.email ? 1 : -1,
        )
        category === 'nameAscending' ?
            setTableData(nameAscending)
            :
            category === 'nameDescending' ?
                setTableData(nameDescending)
                :
                category === 'emailDescending' ?
                    setTableData(emailDescending)
                    :
                    setTableData(emailAscending)
    }

    const sortByNumber = (tableData: IRow[], up: boolean) => {
        let sortedData = [...tableData].map((col: IRow) => ({
            ...col,
            //@ts-ignore
            balance: typeof (col.balance) !== 'string' ? col.balance : col.balance.replace('$', '').replace(',', '')
        })
        )
        up ?
            sortedData.sort((a: IRowBalanceNum, b: IRowBalanceNum) => a.balance - b.balance)
            :
            sortedData.sort((a: IRowBalanceNum, b: IRowBalanceNum) => b.balance - a.balance)

        let sortedDataStringResult = [...sortedData].map((col: IRow) => ({
            ...col,
            //@ts-ignore
            balance: typeof (col.balance) !== 'string' ? col.balance : ['$', ...col.balance.split('')].flat().join('')
        })
        )
        setTableData(sortedDataStringResult)
    }

    const sortByActive = (tableData: IRow[], active: string) => {

        const activeSort = [...tableData].sort(function (x, y) {
            return Number(x.isActive) - Number(y.isActive)
        })
        const notActiveSort = [...tableData].sort(function (x, y) {
            return Number(y.isActive) - Number(x.isActive)
        })

        active === 'notActive' ?
            setTableData(activeSort)
            :
            active === 'active' ?
                setTableData(notActiveSort)
                :
                active === 'emailDescending'
    }

    const resetFilters = () => {
        setIsResetedFilter(!isResetedFilter)
    }

    return (
        <div className={classes.sortRow} >
            <div
                onMouseEnter={() => setShowToolTipActive(true)}
                onMouseLeave={() => setShowToolTipActive(false)}
            >
                По активности
                {showToolTipActive && <div className={classes.tooltip}
                    onMouseLeave={() => setShowToolTipActive(false)}>
                    <div onClick={() => sortByActive(tableData, 'active')}>Активные</div>
                    <div onClick={() => sortByActive(tableData, 'notActive')}>Не активные</div>
                    <div onClick={resetFilters}>По умолчанию</div>
                </div>}
            </div>

            <div 
            onMouseEnter={() => setShowToolTipBalance(true)}
            onMouseLeave={() => setShowToolTipBalance(false)}
            >
                По балансу
                {showToolTipBalance && <div className={classes.tooltip}
                    onMouseLeave={() => setShowToolTipBalance(false)}>
                    <div onClick={() => sortByNumber(tableData, true)}>По возратанию</div>
                    <div onClick={() => sortByNumber(tableData, false)}>По убыванию</div>
                    <div onClick={resetFilters}>По умолчанию</div>
                </div>}
            </div>

            <div
                onMouseEnter={() => setShowToolTipName(true)}
                onMouseLeave={() => setShowToolTipName(false)}
            >
                По имени
                {showToolTipName && <div className={classes.tooltip}
                    onMouseLeave={() => setShowToolTipName(false)}>
                    <div onClick={() => sortByText(tableData, 'nameAscending')}>В алфавитном порядке</div>
                    <div onClick={() => sortByText(tableData, 'nameDescending')}>В обратном алфавитном порядке</div>
                    <div onClick={resetFilters}>По умолчанию</div>
                </div>}
            </div>

            <div
                onMouseEnter={() => setShowToolTipEmail(true)}
                onMouseLeave={() => setShowToolTipEmail(false)}
            >
                По email
                {showToolTipEmail && <div className={`${classes.tooltip} ${classes.tooltipRight}`}
                    onMouseLeave={() => setShowToolTipEmail(false)}>
                    <div onClick={() => sortByText(tableData, 'emailA')}>В алфавитном порядке</div>
                    <div onClick={() => sortByText(tableData, 'emailDescending')}>В обратном алфавитном порядке</div>
                    <div onClick={resetFilters}>По умолчанию</div>
                </div>}
            </div>

        </div >
    );
};