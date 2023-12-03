import React, { Dispatch, FC, SetStateAction } from 'react';
import { IRow } from 'src/components/Table';
import classes from './Filter.module.scss';

interface FilterProps {
    tableData: IRow[];
    setTableData: Dispatch<SetStateAction<IRow[] | []>>
    setBalanceValue: Dispatch<SetStateAction<string | number>>
    setNameValue: Dispatch<SetStateAction<string>>
    setEmailValue: Dispatch<SetStateAction<string>>
    setIsResetedFilter: Dispatch<SetStateAction<boolean>>
    balanceValue: string | number
    nameValue: string
    emailValue: string
    isResetedFilter: boolean
}

export const Filter: FC<FilterProps> = ({ setBalanceValue, setNameValue,
    setEmailValue, setTableData, setIsResetedFilter,
    balanceValue, nameValue, emailValue, isResetedFilter, tableData }) => {

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        switch (key) {
            case 'balance':
                setBalanceValue(e.target.value)
                break
            case 'name':
                setNameValue(e.target.value)
                break
            case 'email':
                setEmailValue(e.target.value)
                break
        }

        //@ts-ignore
        let filteredArr = [...tableData].filter((item) => String(item[key]).toLowerCase().includes(e.target.value.toLowerCase()))
        setTableData(filteredArr)
    }

    const resetFilters = () => {
        setIsResetedFilter(!isResetedFilter)
        setBalanceValue('')
        setNameValue('')
        setEmailValue('')
    }

    return (
        <div className={classes.filterRow} >
            <div>
                <div>По балансу:</div>
                <input
                    value={balanceValue}
                    onChange={(e) => handleFilter(e, 'balance')} />
            </div>
            <div>
                <div>По имени:</div>
                <input
                    value={nameValue}
                    onChange={(e) => handleFilter(e, 'name')} />
            </div>
            <div>
                <div>По email:</div>
                <input
                    value={emailValue}
                    onChange={(e) => handleFilter(e, 'email')} />
            </div>
            <div onClick={resetFilters} className={classes.filterDrop}>
                Сбросить фильтры
            </div>
        </div >
    );
};

