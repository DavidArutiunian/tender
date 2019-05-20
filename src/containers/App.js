/** @jsx jsx */

import { jsx, css, Global } from "@emotion/core";
import { Fragment, useContext, useEffect } from "react";
import JssProvider from "components/JssProvider";
import { Router, Match } from "@reach/router";
import Header from "components/Header";
import Drawer from "components/Drawer";
import PrivateRoute from "components/PrivateRoute";
import { StoreContext, BASE_PATH } from "context";
import { TOGGLE_DRAWER, LOG_OUT } from "actions/ui";
import { ADD_PARTNER, ADD_PARTICIPANT_TO_PARTNER } from "actions/partner";
import { ADD_DEAL } from "actions/deal";
import { observer } from "mobx-react-lite";
import Loadable from "react-loadable";
import Loading from "components/Loading";
import Grid from "@material-ui/core/Grid";
import { getPartnerPayload, getDealPayload, getParticipantPayload } from "utils";
import moment from "moment";
import "moment/locale/ru";
import cloneDeep from "lodash/cloneDeep";
import find from "lodash/find";
import { ADD_PARTICIPANT } from "actions/participant";

// stub data
import partners from "data/partner";
import deals from "data/deal";
import participants from "data/participant";

const AsyncPartners = Loadable({
    loader: () => import("containers/Partners"),
    loading: Loading,
});
const AsyncParticipants = Loadable({
    loader: () => import("containers/Participants"),
    loading: Loading,
});
const AsyncDeals = Loadable({
    loader: () => import("containers/Deals"),
    loading: Loading,
});
const AsyncStatistic = Loadable({
    loader: () => import("containers/Statistic"),
    loading: Loading,
});
const AsyncCatalog = Loadable({
    loader: () => import("containers/Catalog"),
    loading: Loading,
});
const AsyncLoyaltyProgram = Loadable({
    loader: () => import("containers/LoyaltyProgram"),
    loading: Loading,
});
const AsyncAddBaseLoyaltyProgram = Loadable({
    loader: () => import("containers/AddBaseLoyaltyProgram"),
    loading: Loading,
});
const AsyncAddExtraLoyaltyProgram = Loadable({
    loader: () => import("containers/AddExtraLoyaltyProgram"),
    loading: Loading,
});
const AsyncSignUp = Loadable({
    loader: () => import("containers/SignUp"),
    loading: Loading,
});
const AsyncSignIn = Loadable({
    loader: () => import("containers/SignIn"),
    loading: Loading,
});
const AsyncAddPartner = Loadable({
    loader: () => import("containers/AddPartner"),
    loading: Loading,
});
const AsyncPartnerProfile = Loadable({
    loader: () => import("containers/PartnerProfile"),
    loading: Loading,
});
const AsyncDealProfile = Loadable({
    loader: () => import("containers/DealProfile"),
    loading: Loading,
});

function App() {
    const store = useContext(StoreContext);

    useEffect(() => initStubData(store));

    function onDrawerToggle() {
        store.ui[TOGGLE_DRAWER]();
    }

    return (
        <JssProvider>
            <Fragment>
                <Global
                    styles={css`
                        body {
                            font-family: "Roboto", sans-serif;
                        }
                        html,
                        body {
                            margin: 0;
                            height: 100%;
                            width: 100%;
                        }
                        body {
                            background: #eeeeee;
                        }
                    `}
                />
                <PrivateRoute
                    isLoggedIn={store.ui.isLoggedIn}
                    noRedirect
                    render={() => (
                        <Fragment>
                            <Match path={BASE_PATH + "/login"}>
                                {props => props.match && store.ui[LOG_OUT]()}
                            </Match>
                            <Match path={BASE_PATH + "/register"}>
                                {props => props.match && store.ui[LOG_OUT]()}
                            </Match>
                        </Fragment>
                    )}
                />
                <Grid
                    container
                    direction="row"
                    css={css`
                        width: 100%;
                        height: 100%;
                        flex-wrap: nowrap;
                    `}
                >
                    <Grid
                        item
                        css={css`
                            flex-shrink: 0;
                            height: 100%;
                        `}
                    >
                        {store.ui.isLoggedIn && (
                            <Drawer
                                items={store.ui.drawer}
                                isOpen={store.ui.isDrawerOpen}
                                onToggle={onDrawerToggle}
                            />
                        )}
                    </Grid>
                    <Grid
                        item
                        css={css`
                            flex-grow: 1;
                        `}
                    >
                        <Header
                            user={store.user.current}
                            isLoggedIn={store.ui.isLoggedIn}
                            onDrawerToggle={onDrawerToggle}
                        />
                        <Router
                            css={css`
                                width: ${store.ui.isLoggedIn ? "calc(100% - 60px)" : "100%"};
                                ${store.ui.isLoggedIn ? "min-" : ""}height: calc(100% - 58px);
                                padding: ${store.ui.isLoggedIn ? "0 40px 0 20px" : "0"};
                                display: flex;
                            `}
                            basepath={BASE_PATH === "" ? "/" : BASE_PATH}
                        >
                            <PrivateRoute
                                isLoggedIn={store.ui.isLoggedIn}
                                path="/"
                                render={() => <Fragment />}
                            />
                            <PrivateRoute
                                isLoggedIn={store.ui.isLoggedIn}
                                path="partners"
                                render={() => <AsyncPartners />}
                            />
                            <PrivateRoute
                                isLoggedIn={store.ui.isLoggedIn}
                                path="partners/:id"
                                render={props => <AsyncPartnerProfile {...props} />}
                            />
                            <PrivateRoute
                                isLoggedIn={store.ui.isLoggedIn}
                                path="partners/add"
                                render={() => <AsyncAddPartner />}
                            />
                            <PrivateRoute
                                isLoggedIn={store.ui.isLoggedIn}
                                path="loyality/add-base"
                                render={() => <AsyncAddBaseLoyaltyProgram />}
                            />
                            <PrivateRoute
                                isLoggedIn={store.ui.isLoggedIn}
                                path="loyality/add-extra"
                                render={() => <AsyncAddExtraLoyaltyProgram />}
                            />
                            <PrivateRoute
                                isLoggedIn={store.ui.isLoggedIn}
                                path="participants"
                                render={() => <AsyncParticipants />}
                            />
                            <PrivateRoute
                                isLoggedIn={store.ui.isLoggedIn}
                                path="deals"
                                render={() => <AsyncDeals />}
                            />
                            <PrivateRoute
                                isLoggedIn={store.ui.isLoggedIn}
                                path="deals/:id"
                                render={props => <AsyncDealProfile {...props} />}
                            />
                            <PrivateRoute
                                isLoggedIn={store.ui.isLoggedIn}
                                path="statistic"
                                render={() => <AsyncStatistic />}
                            />
                            <PrivateRoute
                                isLoggedIn={store.ui.isLoggedIn}
                                path="catalog"
                                render={() => <AsyncCatalog />}
                            />
                            <PrivateRoute
                                isLoggedIn={store.ui.isLoggedIn}
                                path="loyality"
                                render={() => <AsyncLoyaltyProgram />}
                            />
                            <AsyncSignUp path="register" />
                            <AsyncSignIn path="login" />
                        </Router>
                    </Grid>
                </Grid>
            </Fragment>
        </JssProvider>
    );
}

function initStubData(store) {
    if (store.ui.isLoggedIn) {
        partners.forEach(partner => {
            const partnerPayload = {
                ...getPartnerPayload(),
                ...cloneDeep(partner),
            };
            store.partner[ADD_PARTNER](partnerPayload);
        });

        deals.forEach(deal => {
            const dealPayload = {
                ...getDealPayload(),
                ...cloneDeep(deal),
            };
            if (deal.activePeriod.from) {
                dealPayload.activePeriod.from = moment(dealPayload.activePeriod.from).toDate();
            }
            if (deal.activePeriod.to) {
                dealPayload.activePeriod.to = moment(dealPayload.activePeriod.to).toDate();
            }
            store.deal[ADD_DEAL](dealPayload);
        });

        participants.forEach(participant => {
            const partner = find(store.partner.partners, { title: participant.partner });
            const participantPayload = {
                ...getParticipantPayload(),
                ...cloneDeep(participant),
                partner: partner.id,
            };
            const { id } = store.participant[ADD_PARTICIPANT](participantPayload);
            store.partner[ADD_PARTICIPANT_TO_PARTNER]({
                id: partner.id,
                participant: id,
            });
        });
    }
}

export default observer(App);
