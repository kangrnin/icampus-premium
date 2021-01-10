function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms)
    });
}

function getWhenExists(selector) {
    return new Promise(async resolve => {
        while(!$(selector).length)
            await sleep(100);
        resolve($(selector)[0]);
    });
}

$(async () => {
    const video = await getWhenExists('video.vc-vplay-video1');
    $(video).on('loadedmetadata', async e => { 
        if(e.target.src.includes('/settings/viewer/uniplayer/intro')) {
            await sleep(100);
            e.target.currentTime = e.target.duration;
        }
    })
});