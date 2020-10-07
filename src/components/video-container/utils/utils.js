const getYoutubeData = async id => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails&part=snippet&key=AIzaSyBWyJ8_5gt686cUsIlEymxe7ho9M0I56TY`
    )
    const json = await res.json()
    const data = json.items[0]
    //console.log(data)
    let time = ""
    let description = ""
    let date = ""
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
      time = time.join(":")
      description = data.snippet.description
      date = data.snippet.publishedAt
        .split("T")[0]
        .split("-")
        .reverse()
        .join("-")
    }

    return [time, description, date]
  } catch (err) {
    console.log(err)
  }
}

export const getData = async routes => {
  const videos = []
  let j = 0
  for (let i of routes) {
    if (j === 15) break
    if (i["_additionalInformation"]) {
      console.log(i)
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
      const [videoLength, description, date] = arr
      videos.push({
        h1: h1,
        id: id,
        km: km,
        videoLength: videoLength,
        description: description,
        date: date,
        latlngs: latlngs,
      })
    }
    j++
  }
  return await videos
}
