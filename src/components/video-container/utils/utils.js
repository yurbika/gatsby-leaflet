const getYoutubeData = async id => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails&part=snippet&key=${process.env.GATSBY_YOUTUBE_API_KEY}`
    )
    const json = await res.json()
    const data = json.items[0]

    //return values
    let time = ""
    let description = ""
    let date = ""
    let videoLengthMS = ""

    //extract data
    if (data) {
      let hour = data.contentDetails.duration.includes("H")
      let minutes = data.contentDetails.duration.includes("M")
      let seconds = data.contentDetails.duration.includes("S")

      time = data.contentDetails.duration
        .replace("PT", "")
        .replace("H", ":")
        .replace("M", ":")
        .replace("S", "")
        .split(":")

      //convert every single digit to a double digit 1 => 01
      for (let i = 0; i < time.length; i++) {
        if (time[i].length === 1) time[i] = "0" + time[i]
      }

      //calculating time in ms
      if (hour && minutes && seconds) {
        let temp = 0
        temp += time[0] * 60 * 60 * 1000
        temp += time[1] * 60 * 1000
        temp += time[2] * 1000
        videoLengthMS = temp
      } else if (hour && minutes) {
        let temp = 0
        temp += time[0] * 60 * 60 * 1000
        temp += time[1] * 60 * 1000
        videoLengthMS = temp
      } else if (hour && seconds) {
        let temp = 0
        temp += time[0] * 60 * 60 * 1000
        temp += time[1] * 1000
        videoLengthMS = temp
      } else if (minutes && seconds) {
        let temp = 0
        temp += time[0] * 60 * 1000
        temp += time[1] * 1000
        videoLengthMS = temp
      } else if (hour) {
        videoLengthMS = time[0] * 60 * 60 * 1000
      } else if (minutes) {
        videoLengthMS = time[0] * 60 * 1000
      } else {
        videoLengthMS = time[0] * 1000
      }

      //creating duration stamp
      if (!hour && !minutes && seconds) {
        time = "00" + time[0]
      } else if (hour && !minutes && seconds) {
        time = time[0] + ":00:" + time[1]
      } else if (!hour && minutes && !seconds) {
        time = time[0] + ":00"
      } else if (hour && minutes && !seconds) {
        time = time[0] + ":" + time[1] + ":00"
      } else {
        time = time.join(":")
      }

      description = data.snippet.description
      date = data.snippet.publishedAt.split("T")[0].split("-").reverse()
      if (date) {
        ;[date[0], date[1]] = [date[1], date[0]]
      }
      date = date.join("-")
    } // end extract data

    return [time, description, date, videoLengthMS]
  } catch (err) {
    console.log(err)
  }
}

export const getData = async (routes, curPage) => {
  const videos = []
  const fetchMaxVideos = 10
  const max = fetchMaxVideos * curPage + fetchMaxVideos

  for (let i = fetchMaxVideos * curPage; i < max; i++) {
    if (routes[i]) {
      let title = routes[i]["_additionalInformation"].match(
        /(?<=<h2>)(.*)(?=<\/h2>)/gm
      )[0]
      let id = routes[i]["_additionalInformation"].match(/(?<=v=)[-\w]{11}/gm)
      let km = routes[i]["_additionalInformation"].match(
        /(?<=Distance in km: )([0-9]*[,])?[0-9]+/gm
      )
      let latlngs = routes[i]["_latlngs"]

      //calculate distance if km is missing
      if (
        (km === "" || km === null) &&
        (latlngs !== undefined || latlngs !== null)
      ) {
        for (let i = 0; i < latlngs.length - 1; i++) {
          let lat1 = latlngs[i]["lat"]
          let lng1 = latlngs[i]["lng"]
          let lat2 = latlngs[i + 1]["lat"]
          let lng2 = latlngs[i + 1]["lng"]

          km += calcDistance(lat1, lng1, lat2, lng2)
        }
        km = Math.round((km + Number.EPSILON) * 100) / 100
      }
      // a video could contain multiple ids
      for (let j of id) {
        let arr = await getYoutubeData(j)
        const [videoLength, description, date, videoLengthMS] = arr
        videos.push({
          title: title,
          id: [j],
          km: km,
          videoLength: videoLength,
          videoLengthMS: videoLengthMS,
          description: description,
          date: date,
          latlngs: latlngs,
          target: routes[i],
        })
      }
    }
  }

  return await videos
}

//sort depending on map target clicked
export const sortVideos = (target, arr) => {
  let idx = null,
    i = 0

  for (let ele of arr) {
    if (
      String(ele["_additionalInformation"]).localeCompare(
        target["_additionalInformation"]
      ) === 0
    )
      idx = i
    else i++
  }
  if (idx === null) return null
  arr.unshift(arr[idx])
  arr.splice(idx + 1, 1)
  return arr
}

//haversine
const calcDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371 // metres
  lat1 = (lat1 * Math.PI) / 180
  lat2 = (lat2 * Math.PI) / 180
  lng1 = (lng1 * Math.PI) / 180
  lng2 = (lng2 * Math.PI) / 180

  let dlng = lng2 - lng1
  let dlat = lat2 - lat1

  const a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlng / 2), 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  let d = R * c
  return d
}
