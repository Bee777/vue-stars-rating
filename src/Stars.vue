<template>
<div class="rating" :style="{color:bgColor}">
  <template v-for="star in stars">
    <input type="radio" :class="inClass" :value="star">
    <label :for="belFor" :class="[belClass, star<=rated?'rated':'']"
      @click="setStar(star, $event)" 
      @mouseover="setStar(star, $event)"
      @mouseout="unsetStar" 
      :style="{color:star<=rated?outColor:'', fontSize:fontSize}">
    </label>
  </template>
</div>
</template>
<script>
export default{
    props:{
      belClass: { type: String, default: ''},
      inClass:{ type: String, default: ''},
      belFor: { type: String, default: ''},
      starLevel: { type: Number, default: 0},
      color: { type: String, default: '#e54e26'},
      hoverColor: { type: String, default: '#e54e26'},
      bgColor: { type: String, default: '#ddd'},
      fontSize: {type: String, default: "1.25em;"},
      value: {type: Number, default: 0 },
      range: { type: Array, default: ()=>{return [1,2,3,4,5];}},
    },
    data() {
        return {
          stars: this.range,
          rated: this.starLevel,
          overRated: 0,
          outRated: this.starLevel,
          outColor: '',
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
          this.rated=this.overRated;
          this.outColor=this.hoverColor;
        }
      },//end set stars
      unsetStar(e){
        this.rated = this.outRated;
        this.outColor=this.color;
      },//end unset stars
    },
    mounted(){
      this.$emit('send', this.rated)
      this.$emit('input', this.rated)
    }
}   
</script>
<style lang="css" scoped>
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