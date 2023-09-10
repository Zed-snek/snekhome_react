import {Link} from "react-router-dom";
import style from "./CommunityLogsModal.module.css";
import {formatDate} from "../../../functions/timeDateFunctions";

function linkToUser(nickname) {
    return <Link to={"/u/" + nickname} className={style.linkToUser}>{nickname}</Link>
}
function permitted(status) {
    return status === "true" ? "permitted" : "banned"
}

export function getLogContent(log) {
    const actor = <>
        <span className={style.logDate}> {formatDate(log.date)}: </span>
        {linkToUser(log.actionNickname)}
    </>

    switch (log.logType) {
        case "DELETE_POST":
            return <div>
                {actor} deleted post created by user {linkToUser(log.secondNickname)} with text: <i>{log.message}</i>
            </div>
        case "BAN_USER":
            return <div>
                {actor} banned user {linkToUser(log.secondNickname)}
            </div>
        case "UNBAN_USER":
            return <div>
                {actor} unbanned user {linkToUser(log.secondNickname)}
            </div>
        case "GRANT_ROLE":
            return <div>
                {actor} granted user {linkToUser(log.secondNickname)} with role: <strong>{log.message}</strong>
            </div>
        case "REVOKE_ROLE":
            return <div>
                {actor} revoked role: <strong>{log.message}</strong> from user {linkToUser(log.secondNickname)}
            </div>
        case "ACCEPT_JOIN_REQUEST":
            return <div>
                {actor} accepted user {linkToUser(log.secondNickname)} by join request
            </div>
        case "JOIN_BY_INVITE":
            return <div>
                {actor} joined to community by invite from {linkToUser(log.secondNickname)}
            </div>
        case "NEW_COMMUNITY_TITLE":
            return <div>
                {actor} updated community title to: <i>{log.message}</i>
            </div>
        case "NEW_GROUPNAME":
            return <div>
                {actor} updated groupname (id) to: <i>{log.message}</i>
            </div>
        case "NEW_DESCRIPTION":
            return <div>
                {actor} updated community description to: <i>{log.message}</i>
            </div>
        case "NEW_IMAGE":
            return <div>
                {actor} updated community image
            </div>
        case "DELETE_IMAGE":
            return <div>
                {actor} deleted community image
            </div>
        case "RULE_ANON_POSTS":
            return <div>
                {actor} {permitted(log.message)} possibility to make anonymous posts
            </div>
        case "RULE_CLOSED_COMMUNITY":
            return <div>
                {actor} made community {log.message === "true" ? "closed" : "opened"}
            </div>
        case "RULE_INVITE_USERS":
            return <div>
                {actor} {permitted(log.message)} possibility to invite users
            </div>
        case "NEW_CITIZEN_REQUIREMENTS_DAYS":
            return <div>
                {actor} updated requirements of days to become citizen to {log.message} days
            </div>
        case "NEW_CITIZEN_REQUIREMENTS_RATING":
            return <div>
                {actor} updated requirements of rating to become citizen to {log.message} ratings
            </div>
        case "NEW_ELECTIONS_PERIOD":
            return <div>
                {actor} changed election period to {log.message} days
            </div>
    }
}