const getYoutubeData = async id => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails&part=snippet&key=${process.env.GATSBY_YOUTUBE_API_KEY}`
    )
    const json = await res.json()
    const data = json.items[0]
    //console.log(data)
    let time = ""
    let description = ""
    let date = ""
    let videoLengthMS = ""
    if (data) {
      time = data.contentDetails.duration
        .replace("PT", "")
        .replace("H", ":")
        .replace("M", ":")
        .replace("S", "")
        .split(":")
      for (let i = 0; i < time.length; i++) {
        if (time[i].length === 1) time[i] = "0" + time[i]
      }
      if (time.length === 3) {
        let temp = 0
        temp += time[0] * 60 * 60 * 1000
        temp += time[1] * 60 * 1000
        temp += time[2] * 1000
        videoLengthMS = temp
      } else if (time.length === 2) {
        let temp = 0
        temp += time[0] * 60 * 1000
        temp += time[1] * 1000
        videoLengthMS = temp
      } else if (time.length === 1) {
        videoLengthMS = time[0] * 1000
      }

      //if time === min without anything else
      if (time.length === 2 && time[1] === "") {
        time[1] = "00"
      }

      time = time.join(":")

      description = data.snippet.description
      date = data.snippet.publishedAt.split("T")[0].split("-").reverse()
      if (date) {
        ;[date[0], date[1]] = [date[1], date[0]]
      }
      date = date.join("-")
    }

    return [time, description, date, videoLengthMS]
  } catch (err) {
    console.log(err)
  }
}

export const getData = async (routes, curPage) => {
  const videos = []
  const maxVideos = 10
  const max = maxVideos * curPage + maxVideos

  for (let i = maxVideos * curPage; i < max; i++) {
    if (routes[i]) {
      let h1 = routes[i]["_additionalInformation"].match(
        /(?<=<h2>)(.*)(?=<\/h2>)/gm
      )[0]
      let id = routes[i]["_additionalInformation"].match(/(?<=v=)[-\w]{11}/gm)
      let km = routes[i]["_additionalInformation"].match(
        /(?<=Distance in km: )([0-9]*[,])?[0-9]+/gm
      )
      let latlngs = routes[i]["_latlngs"]
      if (km === "") {
        km = "-"
      }

      for (let j of id) {
        let arr = await getYoutubeData(j)
        const [videoLength, description, date, videoLengthMS] = arr
        videos.push({
          h1: h1,
          id: [j],
          km: km,
          videoLength: videoLength,
          videoLengthMS: videoLengthMS,
          description: description,
          date: date,
          latlngs: latlngs,
        })
      }
    }
  }

  return await videos
}
