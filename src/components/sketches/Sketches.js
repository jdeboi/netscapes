

const getClassN = (id) => {
    const publishNum = 4;
    if (id <= publishNum)
        return "";
    return "disabled"
}
export const sketches = [
    { id: 1, short: "mine", link: "mine", title: "mine", shortcut: "&#x2318;1", year: 2021, classN: "" },
    { id: 5, short: "out", link: "overclocked", title: "over⏰'d", shortcut: "&#x2318;2", year: 2021, classN: getClassN(2) },
    { id: 3, short: "cat", link: "cat-5", title: "cat 5", shortcut: "&#x2318;3", year: 2021, classN: getClassN(3) },

    { id: 7, short: "mojave", link: "mojave", title: "mojave", shortcut: "&#x2318;4", year: 2021, classN: getClassN(4) },
    { id: 2, short: "yosemite", link: "yosemite", title: "yosemite", shortcut: "&#x2318;5", year: 2021, classN: getClassN(5) },
   
    { id: 6, short: "jungle", link: "jungle-gyms", title: "jungle gyms", shortcut: "&#x2318;6", year: 2021, classN: getClassN(6) },
    
   
    { id: 4, short: "hard", link: "hard-drives-on-seashores", title: "hard drives on seashores", shortcut: "&#x2318;7", year: 2021, classN: getClassN(7) },
   
    { id: 8, short: "melt", link: "melt", title: "melt", shortcut: "&#x2318;8", year: 2021, classN: getClassN(8) }

];

const homeSketch = sketches[0];

//{ id: 7, short: "beached", link: "beached", title: "beached", shortcut: "&#x2318;8", year: 2021, classN: "" },

export const getUrl = (short) => {
    let sk = sketches.find((sketch) => sketch.short === short);
    return "/" + sk.link;
}

export const getRoomTitle = (path) => {
    const link = path.substring(1, path.length);
    if (link === "")
        return homeSketch.title;
    else if (link === "about")
        return "about";

    let sk = sketches.find((sketch) => sketch.link === link);
    if (!sk)
        return ""
    return sk.title;
}

export const getSketchFromTitle = (title) => {
    if (title === "")
        return homeSketch;
    return sketches.find((sketch) => sketch.title === title);
}