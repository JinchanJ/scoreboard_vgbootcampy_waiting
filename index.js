(($) => {
  gsap.config({ nullTargetWarn: false, trialWarn: false });

  let startingAnimation = gsap
    .timeline({ paused: true })
    .from([".logo"], { duration: 0.5, autoAlpha: 0, ease: "power2.inOut" }, 0.5)
    .from(
      [".anim_container_outer"],
      {
        duration: 1,
        width: "0",
        ease: "power2.inOut",
      },
      1
    )
    .from(
      [".p1.twitter"],
      {
        duration: 0.75,
        x: "-373px",
        ease: "power4.Out",
      },
      "<25%"
    )
    .from(
      [".p2.twitter"],
      {
        duration: 0.75,
        x: "373px",
        ease: "power4.Out",
      },
      "<"
    )
    // .from(
    //   ".tournament_container",
    //   { opacity: 0, duration: 0.5, ease: "power4.Out" },
    //   "<80%"
    // )
    .from(
      ".tournament_container",
      {
        duration: 0.75,
        x: "-373px",
        ease: "power4.Out",
      },
      "<"
    )
    .from(
      ".tournament_logo",
      { opacity: 0, duration: 0.5, ease: "power4.Out" },
      "<"
    );

  function Start() {
    startingAnimation.restart();
  }

  var data = {};
  var oldData = {};

  async function Update() {
    oldData = data;
    data = await getData();

    [data.score.team["1"], data.score.team["2"]].forEach((team, t) => {
      [team.player["1"]].forEach((player, p) => {
        if (player) {
          SetInnerHtml(
            $(`.p${t + 1}.container .name`),
            `
              <span class="sponsor">
                ${player.team ? player.team.toUpperCase() : ""}
              </span>
              ${player.name ? player.name.toUpperCase() : ""}
              ${team.losers ? "(L)" : ""}
            `
          );

          let score = [data.score.score_left, data.score.score_right];

          SetInnerHtml($(`.p${t + 1}.score`), String(team.score));
        }
      });
    });
  }

  Update();
  $(window).on("load", () => {
    $("body").fadeTo(1, 1, async () => {
      Start();
      setInterval(Update, 100);
    });
  });
})(jQuery);
