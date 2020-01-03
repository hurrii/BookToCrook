<template lang="pug">
  footer.footer
    .container
      .wrapper
        a(href='https://developers.google.com/books' target='__blank').google
          img(src='~/assets/img/powered_by_googe.png')
        a(href='https://github.com/hurrii' target='__blank').copyright Made by&nbsp;
          b.me hurrii

</template>

<style lang="stylus" scoped>
  .footer
    margin-top 2rem
    height 5rem
    .container
      height inherit

    .wrapper
      height inherit
      display flex
      justify-content flex-end
      align-items center
      width 100%
      border-top 1px solid rgba(#000, .25)

    .google
      height 3rem
      display flex
      align-items center

    .copyright
      height 3rem
      font-family monospace, sans-serif
      margin-left 2rem
      font-size 1.8rem
      line-height 2.8rem

      &:hover
        color #000
        .me
          animation text-shadow 1.5s ease-in-out infinite

  @keyframes text-shadow
    0%
      transform translateY(0)
      text-shadow 0 0 0 #0c2ffb,
          0 0 0 #2cfcfd,
          0 0 0 #fb203b,
          0 0 0 #fefc4b

    20%
      transform translateY(-1em)
      text-shadow 0 0.125em 0 #0c2ffb,
                  0 0.25em 0 #2cfcfd,
                  0 -0.125em 0 #fb203b,
                  0 -0.25em 0 #fefc4b

    40%
      transform translateY(0.5em)
      text-shadow 0 -0.0625em 0 #0c2ffb,
                  0 -0.125em 0 #2cfcfd,
                  0 0.0625em 0 #fb203b,
                  0 0.125em 0 #fefc4b

    60%
      transform translateY(-0.25em)
      text-shadow 0 0.03125em 0 #0c2ffb,
                  0 0.0625em 0 #2cfcfd,
                  0 -0.03125em 0 #fb203b,
                  0 -0.0625em 0 #fefc4b

    80%
      transform translateY(0)
      text-shadow 0 0 0 #0c2ffb,
                  0 0 0 #2cfcfd,
                  0 0 0 #fb203b,
                  0 0 0 #fefc4b
    @media (prefers-reduced-motion: reduce)
        *
            animation none !important
            transition none !important
</style>
