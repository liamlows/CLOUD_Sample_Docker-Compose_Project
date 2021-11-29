import { url } from "../utils/url";
import axios from "axios"

export class SportRepository {

    config = {
    };

    async getAllGames(league_name) {
        return await new Promise((resolve, reject) => {
            axios.get(`http://${url}:8000/games/leagueDESC`,
                { params: { league: league_name } }
            )
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getTeamName1FromGameID(id) {
        // let config = this.config;
        // if (params) {
        //     config.params = params;
        // }
        return new Promise((resolve, reject) => {
            axios.get(`http://${url}:8000/games/team1?GameID=${id}`)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }
    
    async getTeamName2FromGameID(id) {
        return await new Promise((resolve, reject) => {
            axios.get(`http://${url}:8000/games/team2?GameID=${id}`, {
            })
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getRanking(league_name) {
        // let config = this.config;
        // if (params) {
        //     config.params = params;
        // }
        return new Promise((resolve, reject) => {
            axios.get(`http://${url}:8000/league/rankings?league=${league_name}`)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getTeamIDFromTeamName(name) {
        return new Promise((resolve, reject) => {
            axios.get(`http://${url}:8000/teams/teamID?teamName=${name}`)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getTeamNameFromTeamID(teamID) {
        return new Promise((resolve, reject) => {
            axios.get(`http://${url}:8000/teams/teamName?teamID=${teamID}`)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getPlayersFromTeam(TeamID) {
        // let config = this.config;
        // if (params) {
        //     config.params = params;
        // }
        return new Promise((resolve, reject) => {
            axios.get(`http://${url}:8000/team/allplayers?TeamID=${TeamID}`)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getWinnerFromGame(gameID) {
        return new Promise((resolve, reject) => {
            axios.get(`http://${url}:8000/game/winner?gameID=${gameID}`)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getGameMVP(gameID) {
        return new Promise((resolve, reject) => {
            axios.get(`http://${url}:8000/game/mvp?gameID=${gameID}`)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getMostRecentBool(league, gameID) {
        return new Promise((resolve, reject) => {
            axios.get(`http://${url}:8000/game/mostRecent?league=${league}&$gameID=${gameID}`)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getTeamScoreFromGame(gameID, teamID) {
        return new Promise((resolve, reject) => {
            axios.get(`http://${url}:8000/game/teamScore?gameID=${gameID}&teamID=${teamID}`)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }
}