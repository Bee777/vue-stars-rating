<template>
<div id="half-stars-rating">
  <div class="rating" :style="{color:bgColor}">
    <template v-for="star in stars">
      <input type="radio" :class="inClass" :value="star">
      <label :for="belFor" :class="[belClass, star<=rated?'rated':'', , star%1!==0?'half':'']"
        @click="setStar(star, $event)" 
        @mouseover="setStar(star, $event)"
        @mouseout="unsetStar" 
        :style="{color:star<=rated?outColor:'', fontSize:fontSize}">
      </label>
    </template>
  </div>
  <div style="clear:both;"></div>
</div>
</template>
<script>
/** Defined function */
if(!Array.prototype.sortArray){ 
    Array.prototype.sortArray = function(args){
      var temp=[];
      if(args){
        if(args==='desc'){
          for (var i = 0; i < this.length; i++) {
            for (var j = 0; j < this.length-1; j++) {
              if(this[j]<this[j+1]){
                temp = this[j+1];
                this[j+1] = this[j];
                this[j]=temp;
              }
            }
          }//end for desc
        }else{
          for (var i = 0; i < this.length; i++) {
            for (var j = 0; j < this.length-1; j++) {
              if(this[j]>this[j+1]){
                temp = this[j+1];
                this[j+1] = this[j];
                this[j]=temp;
              }
            }
          }//end for asc
        }//end else
      }//end if args
      return this;
    };
}
/** ended defined function */
export default{
    props:{
      belClass: { type: String, default: ''},
      inClass:{ type: String, default: ''},
      belFor: { type: String, default: ''},
      starLevel: { type: Number, default: 0},
      value: {type: Number, default: 0 },
      color: { type: String, default: '#e54e26'},
      hoverColor: { type: String, default: '#e54e26'},
      bgColor: { type: String, default: '#ddd'},
      fontSize: {type: String, default: "1.25em;"},
      range: { type: Array, default: ()=>{return [0.5,1,1.5,2,2.5,3,3.5,4,4.5,5];}},
    },
    data() {
        return {
          stars: this.range.sortArray('desc'),
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
          this.rated=this.overRated
          this.outColor=this.hoverColor;
        }
      },//end set stars
      unsetStar(e){
        this.rated = this.outRated
        this.outColor=this.color;
      },//end unset stars
    },
    mounted(){
      this.$emit('send', this.rated);
      this.$emit('input', this.rated);
    },
}   
</script>
<style lang="css" scoped>
label{cursor: pointer;}
input{cursor: pointer;}
.rating{
  border: none;
  float: left;
}
.rating > label {
  float: right; 
}
.rating > input { display: none; } 
.rating > label:before { 
  margin: 5px;
  font-size: 1.25em;
  font-family: FontAwesome;
  display: inline-block;
  content: "\f005";
}
.rating > .half:before { 
  content: "\f089";
  position: absolute;
}
</style>