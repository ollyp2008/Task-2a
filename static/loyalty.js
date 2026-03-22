const pointsEl = document.getElementById("points")
const fillEl = document.getElementById("progress-fill")
const textEl = document.getElementById("progress-text")
const redeemBtn = document.getElementById("redeem-btn")
const msg = document.getElementById("redeem-msg")

let points = 0


async function loadPoints() {

  const { data, error } =
    await supabase
      .from("users")
      .select("points")
      .single()

  if (error) {
    console.log(error)
    return
  }

  points = data.points || 0

  updateUI()
}


function updateUI() {

  pointsEl.textContent = points

  let percent = (points % 100)

  fillEl.style.width = percent + "%"

  textEl.textContent =
    percent + "/100 to next reward"

}


redeemBtn.addEventListener(
  "click",
  async () => {

    if (points < 100) {
      msg.textContent =
        "Not enough points"
      return
    }

    points -= 100

    await supabase
      .from("users")
      .update({ points })
      .eq("id", 1)

    msg.textContent =
      "Reward redeemed!"

    updateUI()

  }
)


loadPoints()