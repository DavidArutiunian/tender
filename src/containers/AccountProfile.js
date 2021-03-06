/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import * as PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Layout from "components/Layout";
import Typography from "@material-ui/core/Typography";
import { useRef, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import HeaderTableCell from "components/table/HeaderTableCell";
import TableCellMoreIcon from "components/table/TableCellMoreIcon";
import StyledTableHead from "components/table/StyledTableHead";
import { getUniqueIdOfLength, getUniqueId } from "utils";

export default function AccountProfile({ id }) {
    const [tabIndex, setTabIndex] = useState(0);
    const data = useRef({
        prefix: getUniqueIdOfLength(2),
        id: getUniqueIdOfLength(12),
    });

    function onTabChange(_, index) {
        setTabIndex(index);
    }

    return (
        <Layout>
            <Grid container>
                <Grid item xs={12}>
                    <Typography
                        variant="h2"
                        css={css`
                            font-weight: 500;
                            padding-top: 40px;
                            padding-bottom: 50px;
                        `}
                    >
                        <span>Счёт №</span>
                        <span>P</span>
                        <span>{data.current.prefix}</span>
                        <span>_</span>
                        <span>{data.current.id}</span>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12}>
                            <AppBar position="static">
                                <Tabs value={tabIndex} onChange={onTabChange}>
                                    <Tab label="Информация" />
                                    <Tab label="История" />
                                </Tabs>
                            </AppBar>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                {tabIndex === 0 && <MainInfo />}
                                {tabIndex === 1 && (
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Table>
                                                <StyledTableHead>
                                                    <TableRow>
                                                        <HeaderTableCell>
                                                            № транзакции
                                                        </HeaderTableCell>
                                                        <HeaderTableCell>
                                                            Дата транзакции
                                                        </HeaderTableCell>
                                                        <HeaderTableCell>
                                                            Сумма транзакции
                                                        </HeaderTableCell>
                                                        <HeaderTableCell>Баллы</HeaderTableCell>
                                                        <HeaderTableCell>
                                                            Комментарий
                                                        </HeaderTableCell>
                                                    </TableRow>
                                                </StyledTableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>{getUniqueId()}</TableCell>
                                                        <TableCell>28 май, 15:30</TableCell>
                                                        <TableCell>2500 руб.</TableCell>
                                                        <PointsTableCell add>+ 350</PointsTableCell>
                                                        <TableCell>
                                                            Начисление при покупке билета №124578
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>{getUniqueId()}</TableCell>
                                                        <TableCell>19 май, 15:30</TableCell>
                                                        <TableCell>2500 руб.</TableCell>
                                                        <PointsTableCell>- 350</PointsTableCell>
                                                        <TableCell>
                                                            Списание при покупке билета №124578
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>{getUniqueId()}</TableCell>
                                                        <TableCell>15 май, 15:30</TableCell>
                                                        <TableCell>2500 руб.</TableCell>
                                                        <PointsTableCell add>+ 80</PointsTableCell>
                                                        <TableCell>
                                                            По акции "На майские в Питер"
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>{getUniqueId()}</TableCell>
                                                        <TableCell>12 май, 15:30</TableCell>
                                                        <TableCell>2500 руб.</TableCell>
                                                        <PointsTableCell add>+ 700</PointsTableCell>
                                                        <TableCell>Трансфер баллов</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </Grid>
                                    </Grid>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );
}

function MainInfo() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Всего баллов на счёте</TableCell>
                            <TableCell>Сгораемые баллы</TableCell>
                            <TableCell>Несгораемы баллы</TableCell>
                            <TableCell>Целевые</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            css={css`
                                td {
                                    font-size: medium;
                                    font-weight: 500;
                                }
                            `}
                        >
                            <TableCell
                                css={css`
                                    color: #f44336;
                                `}
                            >
                                25 000
                            </TableCell>
                            <TableCell>20 000</TableCell>
                            <TableCell>5 000</TableCell>
                            <TableCell>0</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Grid>
            <Table>
                <StyledTableHead>
                    <TableRow>
                        <HeaderTableCell>Метка</HeaderTableCell>
                        <HeaderTableCell>Баллов</HeaderTableCell>
                        <HeaderTableCell align="right" />
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    <TableRow>
                        <BoldTableCell>Баллы АО "Альфа-Банк"</BoldTableCell>
                        <TableCell>21 100</TableCell>
                        <TableCellMoreIcon />
                    </TableRow>
                    <TableRow>
                        <BoldTableCell>Баллы RADISSON HOTEL GROUP</BoldTableCell>
                        <TableCell>2 500</TableCell>
                        <TableCellMoreIcon />
                    </TableRow>
                    <TableRow>
                        <BoldTableCell>Баллы Окко</BoldTableCell>
                        <TableCell>550</TableCell>
                        <TableCellMoreIcon />
                    </TableRow>
                    <TableRow>
                        <BoldTableCell>Баллы РФСО "Локомотив"</BoldTableCell>
                        <TableCell>850</TableCell>
                        <TableCellMoreIcon />
                    </TableRow>
                    <TableRow
                        css={css`
                            td {
                                font-weight: 500;
                                color: #f44336;
                                font-size: medium;
                            }
                        `}
                    >
                        <BoldTableCell>Всего</BoldTableCell>
                        <TableCell>25 000</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Grid>
    );
}

function PointsTableCell({ add = false, children }) {
    return (
        <TableCell
            css={css`
                color: ${add ? "#4caf50" : "black"};
                font-weight: 500;
            `}
        >
            {children}
        </TableCell>
    );
}

function BoldTableCell({ children }) {
    return (
        <TableCell
            css={css`
                font-weight: 500;
            `}
        >
            {children}
        </TableCell>
    );
}

AccountProfile.propTypes = {
    id: PropTypes.string,
};
