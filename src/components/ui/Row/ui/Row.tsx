import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { IRow } from 'src/components/Table';
import classes from './Row.module.scss';

interface TablProps {
    tableData: IRow[];
}

export const Row: FC<TablProps> = ({ tableData }) => {
    const [isOpenRow, setIsOpenRow] = useState<number>()

    return (
        <div className={classes.col}>
            {tableData.map((row: IRow) => {
                return (
                    <div
                        className={classes.row}
                        key={row.id}
                        onClick={() => setIsOpenRow(row.id)}
                    >
                        {isOpenRow === row.id ? <>
                            <div>{row.isActive ? 'Активна' : 'Не активна'}</div>
                            <div>{row.balance}</div>
                            <div>{row.name}</div>
                            <div>{row.email}</div>
                        </>
                            :
                            <div>
                                {row.name}
                            </div>}
                    </div>
                )
            })}
        </div>
    );
};
