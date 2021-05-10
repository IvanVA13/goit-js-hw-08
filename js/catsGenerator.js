const generatorCats = function (num) {
    const arrCats = [];

    openLink()
    for (let i = 0; i < num; i += 1) {
        let link = {original: "https://loremflickr.com/640/480/cat", preview: "https://loremflickr.com/1280/960/cat", description: `Cat-${i+1}`}
        
    arrCats.push(link)
    }
    return arrCats
}

    const openLink = () => {
        return 
    }

