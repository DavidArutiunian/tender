/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import Layout from "components/Layout";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Tab from "@material-ui/core/Tab";
import { useEffect, useContext, useState } from "react";
import { StoreContext, BASE_PATH } from "context";
import get from "lodash/get";
import { GET_PARTNER_BY_ID } from "actions/partner";
import PropTypes from "prop-types";
import moment from "moment";
import LinkTableCell from "components/table/LinkTableCell";
import HeaderTableCell from "components/table/HeaderTableCell";
import TableCellMoreIcon from "components/table/TableCellMoreIcon";
import GridItem from "components/GridItem";
import StyledTableHead from "components/table/StyledTableHead";

export default function PartnerProfile({ id }) {
    const store = useContext(StoreContext);
    const [partner, setPartner] = useState({});
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        if (id) {
            const document = store.partner[GET_PARTNER_BY_ID]({ id });
            setPartner(document);
        }
    }, [id, store.partner]);

    function onTabChange(_, index) {
        setTabIndex(index);
    }

    const PartnerItem = withPartner(partner);

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
                        {get(partner, "title")}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={12}>
                            <AppBar position="static">
                                <Tabs value={tabIndex} onChange={onTabChange}>
                                    <Tab label="Информация" />
                                    <Tab label="Участники ПЛ" />
                                    <Tab label="Акции" />
                                </Tabs>
                            </AppBar>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                {tabIndex === 0 && <MainInfo component={PartnerItem} />}
                                {tabIndex === 1 && <ParticipantsInfo />}
                                {tabIndex === 2 && <DealsInfo deals={store.deal.deals} />}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );
}

function MainInfo({ component: PartnerItem }) {
    return (
        <Grid
            container
            css={css`
                padding-left: 20px;
                padding-top: 20px;
            `}
        >
            <PartnerItem name="INN" title="ИНН" />
            <PartnerItem name="ORGN" title="ОРГН" />
            <PartnerItem name="manager" title="Менеджер" />
            <PartnerItem name="email" title="Эл. адрес" defaultValue="example@mail.com" />
            <PartnerItem name="phone" title="Телефон" defaultValue="+7 (111) 222-33-44" />
        </Grid>
    );
}

MainInfo.propTypes = {
    component: PropTypes.elementType.isRequired,
};

function ParticipantsInfo() {
    return (
        <Table>
            <StyledTableHead>
                <TableRow>
                    <HeaderTableCell>Номер УПЛ</HeaderTableCell>
                    <HeaderTableCell>ФИО</HeaderTableCell>
                    <HeaderTableCell align="right" />
                </TableRow>
            </StyledTableHead>
            <TableBody>
                <TableRow>
                    <TableCell>1545673513</TableCell>
                    <LinkTableCell>Иванов Иван Иванович</LinkTableCell>
                    <TableCellMoreIcon />
                </TableRow>
                <TableRow>
                    <TableCell>1545673513</TableCell>
                    <LinkTableCell>Мельников Рустам Фахитович</LinkTableCell>
                    <TableCellMoreIcon />
                </TableRow>
                <TableRow>
                    <TableCell>1545673513</TableCell>
                    <LinkTableCell>Меньшиков Владимир Александрович</LinkTableCell>
                    <TableCellMoreIcon />
                </TableRow>
                <TableRow>
                    <TableCell>1545673513</TableCell>
                    <LinkTableCell>Дюжев Алексей Станиславович</LinkTableCell>
                    <TableCellMoreIcon />
                </TableRow>
                <TableRow>
                    <TableCell>1545673513</TableCell>
                    <LinkTableCell>Лер Максим Евгеньевич</LinkTableCell>
                    <TableCellMoreIcon />
                </TableRow>
            </TableBody>
        </Table>
    );
}

function DealsInfo({ deals }) {
    return (
        <Table>
            <StyledTableHead>
                <TableRow>
                    <HeaderTableCell>Название</HeaderTableCell>
                    <HeaderTableCell>Срок действия</HeaderTableCell>
                    <HeaderTableCell align="right" />
                </TableRow>
            </StyledTableHead>
            <TableBody>
                {deals.map(deal => {
                    const { from, to } = deal.activePeriod;
                    return (
                        <TableRow key={deal.id}>
                            <LinkTableCell to={BASE_PATH + `/deals/${deal.id}`}>
                                {deal.title}
                            </LinkTableCell>
                            {from && !to && (
                                <TableCell>от {moment(from).format("DD MMMM YYYY")}</TableCell>
                            )}
                            {!from && to && (
                                <TableCell>до {moment(to).format("DD MMMM YYYY")}</TableCell>
                            )}
                            {from && to && (
                                <TableCell>
                                    <span>{moment(from).format("DD MMMM YYYY")}</span>
                                    <span> - </span>
                                    <span>{moment(to).format("DD MMMM YYYY")}</span>
                                </TableCell>
                            )}
                            <TableCellMoreIcon />
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

DealsInfo.propTypes = {
    deals: PropTypes.array.isRequired,
};

function withPartner(partner) {
    return props => <GridItem data={partner} {...props} />;
}

PartnerProfile.propTypes = {
    id: PropTypes.string,
};