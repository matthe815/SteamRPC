// Import configuration
exports.appID = 252950;
exports.title = "Rocket League";

function getMapAssetKey(normalMapString) {
    if (normalMapString.includes("(")) return "map_"+normalMapString.replace(" ", "").split("(")[0].trim().toLowerCase()+normalMapString.replace(" ", "").split("(")[1].split(")")[0].toLowerCase();
    else return "map_"+normalMapString.replace(" ", "").toLowerCase();
}

// Import functions
exports.translateSteamPresence = (steamRichPresence) => {
    discordRichPresence = {};
    discordRichPresence.details = "playing Rocket League";
    if (steamRichPresence.gamedata === "Menu") {
        discordRichPresence.state = "in Main Menu";
        discordRichPresence.largeImageKey = "rl-default";
        discordRichPresence.largeImageText = "Main Menu";
    }
    if (steamRichPresence.status.toLowerCase().includes(" in ")) {
        discordRichPresence.largeImageKey = getMapAssetKey(steamRichPresence.status.substr(steamRichPresence.status.indexOf(" in ")+4));
        discordRichPresence.largeImageText = steamRichPresence.status.substr(steamRichPresence.status.indexOf(" in ")+4);
    }
    if (steamRichPresence.status.toLowerCase().includes("solo ")) {
        discordRichPresence.smallImageKey = "solo";
        discordRichPresence.smallImageText = "Solo";
    }
    if (steamRichPresence.status.toLowerCase().includes("doubles ")) {
        discordRichPresence.smallImageKey = "doubles";
        discordRichPresence.smallImageText = "Doubles";
    }
    if (steamRichPresence.status.toLowerCase().includes("standard ")) {
        discordRichPresence.smallImageKey = "standard";
        discordRichPresence.smallImageText = "Standard";
    }
    if (steamRichPresence.status.toLowerCase().includes("chaos ")) {
        discordRichPresence.smallImageKey = "chaos";
        discordRichPresence.smallImageText = "Chaos";
    }
    if (steamRichPresence.status.toLowerCase().includes("training")) discordRichPresence.state = "Training";
    else if (steamRichPresence.status.toLowerCase().includes("exhibition")) discordRichPresence.state = "Exhibition";
    else if (steamRichPresence.status.toLowerCase().includes("private match")) discordRichPresence.state = "Private Match";
    else if (discordRichPresence.smallImageText!==undefined) {
        if (steamRichPresence.hasOwnProperty("connect")) discordRichPresence.status = "Ranked "+discordRichPresence;
        else discordRichPresence.status = "Casual "+discordRichPresence;
    }
    return discordRichPresence;
};

// Some examples of Steam Presence gathered (censored):
// {"Dud":"0","status":"Main Menu","gamedata":"Menu"}
// {"Dud":"0","status":"Training in DFH Stadium","gamedata":"Playlist-9"}
// {"Dud":"0","status":"Training in Mannfield","gamedata":"Playlist-9"}
// {"Dud":"0","status":"Training in Utopia Retro","gamedata":"Playlist-9"}
// {"Dud":"0","status":"Private Match in Champions Field","gamedata":"Playlist-6"}
// {"Dud":"0","status":"Doubles in Wasteland","gamedata":"Playlist-2","connect":"-SteamConnectID=[SteamID] -SteamConnectIP=[Random Server IP]"}
// {"Dud":"0","status":"Doubles in AquaDome","gamedata":"Playlist-11"}
// {"Dud":"0","status":"Training in Cosmic","gamedata":"Playlist-9"}
// {"Dud":"0","status":"Chaos in Wasteland","gamedata":"Playlist-4","connect":"-SteamConnectID=[SteamID] -SteamConnectIP=[Random Server IP]"}
// {"Dud":"0","status":"Standard in Beckwith Park (Midnight)","gamedata":"Playlist-3","connect":"-SteamConnectID=[SteamID] -SteamConnectIP=[Random Server IP]"}
// {"Dud":"0","status":"Exhibition in Utopia Coliseum","gamedata":"Playlist-8"}
// {"Dud":"0","status":"Exhibition in Dunk House","gamedata":"Playlist-8"}
// {"Dud":"0","status":"Hoops in Dunk House","gamedata":"Playlist-17","connect":"-SteamConnectID=[SteamID] -SteamConnectIP=[Random Server IP]"}