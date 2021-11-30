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

    async getTeamName1FromGameID(id) {
        // let config = this.config;
        // if (params) {
        //     config.params = params;
        // }
        return await new Promise((resolve, reject) => {
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
    getPlayersFromPlayerID(PlayerID) {
        // let config = this.config;
        // if (params) {
        //     config.params = params;
        // }
        return new Promise((resolve, reject) => {
            axios.get(`http://${url}:8000/playerByID?PlayerID=${PlayerID}`)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }
    
    async getAdCount(TeamID) {
        return await new Promise((resolve, reject) => {
            axios.get(`http://${url}:8000/team/adCount?teamID=${TeamID}`)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    putAdCount(TeamID, AdCount) {
        return new Promise((resolve, reject) => {
            axios.put(`http://${url}:8000/team/adCount`, {
                teamID: TeamID,
                adCount: AdCount
            })
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

    postMVPVote(GameID, PlayerID) {
        return new Promise((resolve, reject) => {
            axios.post(`http://${url}:8000/game/mvp`, {
                gameID: GameID,
                playerID: PlayerID
            })
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    putAdCount(TeamID, AdCount) {
        return new Promise((resolve, reject) => {
            axios.put(`http://${url}:8000/team/adCount`, {
                teamID: TeamID,
                adCount: AdCount
            })
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getPlayerStats(firstname, lastname) {
        return new Promise((resolve, reject) => {
            axios.get(`http://${url}:8000/player/stats?firstName=${firstname}&lastName=${lastname}`)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    getPlayer(firstname, lastname) {
        return new Promise((resolve, reject) => {
            axios.get(`http://${url}:8000/player?firstName=${firstname}&lastName=${lastname}`)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    putPlayerName(PlayerID, FirstName, LastName) {
        return new Promise((resolve, reject) => {
            axios.put(`http://${url}:8000/player/name`, {
                firstName: FirstName,
                lastName: LastName,
                playerID: PlayerID
            })
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    putPlayerPicture(PlayerID, PictureURL) {
        return new Promise((resolve, reject) => {
            axios.put(`http://${url}:8000/player/picture`, {
                playerID: PlayerID,
                playerPicture: PictureURL
            })
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    putPlayerPosition(PlayerID, PlayerPosition) {
        return new Promise((resolve, reject) => {
            axios.put(`http://${url}:8000/player/position`, {
                playerID: PlayerID,
                playerPos: PlayerPosition
            })
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    postNewPlayer(FirstName, LastName, PlayerNumber,TeamID,PlayerPPG, PlayerPosition, PlayerTimePlayed, CoachID, PlayerPictureURL ) {
        return new Promise((resolve, reject) => {
            axios.post(`http://${url}:8000/player`, {
                playerLastName: LastName,
                playerFirstName: FirstName,
                playerNumber: PlayerNumber,
                teamID: TeamID,
                playerPPG: PlayerPPG,
                playerPos: PlayerPosition,
                playerTimePlayed: PlayerTimePlayed,
                coachID: CoachID,
                playerPicture: PlayerPictureURL
            })
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    putGameScore(ID, Score, TeamNum) {
        return new Promise((resolve, reject) => {
            axios.put(`http://${url}:8000/games/score`, {
                GameID: ID,
                score: Score,
                teamNum: TeamNum
            })
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    putGameHidden(GameID, IsHidden) {
        return new Promise((resolve, reject) => {
            axios.put(`http://${url}:8000/game/hide`, {
                gameID: GameID,
                isHidden: IsHidden
            })
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    putTeam1ID(GameID, TeamID) {
        return new Promise((resolve, reject) => {
            axios.put(`http://${url}:8000/games/team1ID`, {
                team1ID: TeamID,
                gameID: GameID
            })
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    putTeam2ID(GameID, TeamID) {
        return new Promise((resolve, reject) => {
            axios.put(`http://${url}:8000/games/team2ID`, {
                team2ID: TeamID,
                gameID: GameID
            })
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    putTeam1Score(GameID, Score) {
        return new Promise((resolve, reject) => {
            axios.put(`http://${url}:8000/games/team1score`, {
                team1Score: Score,
                gameID: GameID
            })
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    putTeam1Score(GameID, Score) {
        return new Promise((resolve, reject) => {
            axios.put(`http://${url}:8000/games/team2score`, {
                team2Score: Score,
                gameID: GameID
            })
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    putTeam1Score(GameID, Winner) {
        return new Promise((resolve, reject) => {
            axios.put(`http://${url}:8000/games/winnerID`, {
                winnerID: Winner,
                gameID: GameID
            })
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    putGameDate(GameID, Date) {
        return new Promise((resolve, reject) => {
            axios.put(`http://${url}:8000/games/date`, {
                date: Date,
                gameID: GameID
            })
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

    postGame(Team1ID, Team2ID,Team1Score,Team2Score,Winner) {
        return new Promise((resolve, reject) => {
            axios.put(`http://${url}:8000/games/date`, {
                team1ID: Team1ID,
                team2ID: Team2ID,
                team1Score: Team1Score,
                team2Score: Team2Score,
                winnerID: Winner
            })
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        });
    }

}