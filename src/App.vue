<template>
	<div>
		<h1>Stars Rating</h1>
		<StarsRating :range="[1,2,3,4,5,6]" v-model="star"/>
		<pre>Selected: {{ star }}</pre>
		<h1>Half Stars Rating</h1>
		<HalfStarsRatings v-model="starHalf" :fontSize="'2em'"/>
		<pre>Selected: {{ starHalf }}</pre>
        <h1>Example:</h1>
        <h3>NodeJs Import Script:</h3>
        <p>import StarsRating from './Stars.vue'</p>
        <p>import HalfStarsRatings from './StarsHalf.vue'</p>
        <h3>Html/Template:</h3>
        <p>
            {{ UseSage.StarTextTag }}
        </p>
        <p>
            {{ UseSage.HalfstarTextTag }}
        </p>
	</div>
</template>
<script>
import StarsRating from './Stars.vue'
import HalfStarsRatings from './StarsHalf.vue'
export default{
	components: {
       StarsRating,
       HalfStarsRatings,
    },
    name: 'app',
    data(){
    	return{
    		star: 0,
    		starHalf: 0,
            UseSage: {
                StarTextTag: `<StarsRating :range="[1,2,3,4,5,6]" v-model="star"/>
                <pre>Selected: {{ star }}</pre>`,
                HalfstarTextTag: `<HalfStarsRatings v-model="starHalf" :fontSize="'2em'"/>
                <pre>Selected: {{ starHalf }}</pre>`
            }
    	}
    }
}
</script>