<template>
<div class="rating">
  <template v-for="star in stars">
    <input type="radio" :class="inClass" :value="star">
    <label :for="belName" :class="[belClass, star<=rated?'rated':'']"
      @click="setStar(star, $event)" 
      @mouseover="setStar(star, $event)"
      @mouseout="unsetStar" >
    </label>
  </template>
</div>
</template>
<script>
export default{
    props:{
      belClass: { type: String, default: ''},
      inClass:{ type: String, default: ''},
      belName: { type: String, default: ''},
      starLevel: { type: Number, default: 1},
      value: {type: Number, default: 1 }
    },
    data() {
        return {
          stars: [1,2,3,4,5],
          rated: this.starLevel,
          overRated: 0,
          outRated: this.starLevel,
        }
    },
    methods:{
      setStar(star, e){
        if(e.which&&e.type==='click'){
          this.outRated = star
          this.rated = star
          this.$emit('send', star)
          this.$emit('input', star)
        }else{
          this.overRated = (star>=this.outRated)?star:this.outRated
          this.rated=this.overRated
        }
      },//end set stars
      unsetStar(e){
        this.rated = this.outRated
      },//end unset stars
    },
    mounted(){
      this.$emit('send', this.rated)
      this.$emit('input', this.rated)
    }
}   
</script>
<style lang="css" scopred>
@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);
label.rated{
    color: #e54e26;
}
label{cursor: pointer;}
input{cursor: pointer;}
.rating > input { display: none; } 
.rating > label:before { 
  margin: 5px;
  font-size: 1.25em;
  font-family: FontAwesome;
  display: inline-block;
  content: "\f005";
}
</style>