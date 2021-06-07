
export const sketches = [
    { id: 1, short: "cat", link: "cat-5", title: "cat 5", shortcut: "&#x2318;1", year: 2021 },
    { id: 2, short: "hard", link: "hard-drives-on-seashores", title: "hard drives on seashores", shortcut: "&#x2318;2", year: 2021 },
    { id: 3, short: "jungle", link: "jungle-gyms", title: "jungle gyms", shortcut: "&#x2318;3", year: 2021 },
    { id: 4, short: "yosemite", link: "yosemite", title: "yosemite", shortcut: "&#x2318;4", year: 2021 },
    { id: 4, short: "mojave", link: "mojave", title: "mojave", shortcut: "&#x2318;5", year: 2021 },
    { id: 6, short: "mine", link: "mine", title: "its-a-mine", shortcut: "&#x2318;6", year: 2021 },
    { id: 7, short: "out", link: "out-of-site", title: "out of site", shortcut: "&#x2318;7", year: 2021 },

];


export const getUrl = (short) => {
    let sk = sketches.find((sketch) => sketch.short === short);
    return "/" + sk.link;
}

export const getRoomTitle = (path) => {
    const link = path.substring(1, path.length);
    let sk = sketches.find((sketch) => sketch.link === link);
    if (!sk)
        return ""
    return sk.title;
}

export const getSketchFromTitle = (title) => {
    return sketches.find((sketch) => sketch.title === title);
}