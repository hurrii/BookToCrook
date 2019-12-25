<template lang="pug">
  .search
    input(type='text' placeholder='Искать на BookToCrook')
    button
      i.icon
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 96 96">
          <g id="XMLID_2_">
            <path id="XMLID_6_" d="M39.3,18c-11.8,0-21.4,9.6-21.4,21.4c0,11.8,9.6,21.4,21.4,21.4c5,0,9.6-1.7,13.2-4.5l4.9,4.9c-1.1,1.1-1.1,2.8,0,3.9l12.1,12.1c1.1,1.1,2.8,1.1,3.9,0l3.9-3.9c1.1-1.1,1.1-2.8,0-3.9L65.2,57.3c-1.1-1.1-2.8-1.1-3.9,0l-5-5c2.7-3.6,4.4-8.1,4.4-12.9C60.7,27.6,51.1,18,39.3,18z M39.3,22.5c9.3,0,16.9,7.6,16.9,16.9c0,9.3-7.6,16.9-16.9,16.9c-9.3,0-16.9-7.6-16.9-16.9C22.4,30.1,30,22.5,39.3,22.5z"/>
          </g>
        </svg>
</template>

<style lang="stylus">
  .search
      position relative
      margin-left auto
      overflow hidden
      height 3rem

      input
        width 20rem
        height 100%
        border 0
        border-radius 7px
        padding 0 3rem 0 .5rem
        font-size 1.2rem

        &::placeholder
          transition color .2s ease

        &:focus::placeholder
          color: transparent

      button
        height 100%
        width 3rem
        border-radius 0px 7px 7px 0px
        position absolute
        top 50%
        transform translateY(-50%)
        right 0
        background $metal
        transition background .2s ease
        cursor pointer
        .icon
          margin 0 auto
          width 2.5rem
          height 2.5rem
          fill white

        &:hover
          background rgba($metal, .9)
</style>
