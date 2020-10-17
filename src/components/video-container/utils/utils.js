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

export const getData = async routes => {
  const videos = []
  let j = 0
  for (let i of routes) {
    if (j === 10) break
    if (i["_additionalInformation"]) {
      let h1 = i["_additionalInformation"].match(/(?<=<h2>)(.*)(?=<\/h2>)/gm)[0]
      let id = i["_additionalInformation"].match(/(?<=v=)[-\w]{11}/gm)
      let km = i["_additionalInformation"].match(
        /(?<=Distance in km: )([0-9]*[,])?[0-9]+/gm
      )
      let latlngs = i["_latlngs"]
      if (km === "") {
        km = "-"
      }

      let arr = await getYoutubeData(id)
      const [videoLength, description, date, videoLengthMS] = arr
      videos.push({
        h1: h1,
        id: id,
        km: km,
        videoLength: videoLength,
        videoLengthMS: videoLengthMS,
        description: description,
        date: date,
        latlngs: latlngs,
      })
    }
    j++
  }
  return await videos
}
