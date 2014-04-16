/**
 * Created by AJ on 14/04/2014.
 */
window.onload = init;

function init(){
    var button = document.getElementsByTagName("button")[0];
    button.onclick = shake( button, fadeOut );
    alert("loaded");
}

function shake( e, oncomplete, distance, time ){
    //Handle arguments
    if( typeof e === "string" )
        e = document.getElementById(e);
    if( !time )
        time = 500;
    if( !distance )
        distance = 10;

    var originalStyle = e.style.cssText; //Save the original style
    e.style.position = "relative";
    var start = ( new Date() ).getTime();
    animate();

    function animate(){
        var now = ( new Date() ).getTime();
        var elapsed = now - start;
        var fraction = elapsed/time;

        if( fraction < 1 ){
            //if animation aint yet completed
            var x = distance * Math.sin( fraction * 4 * Math.PI );
            e.style.left = x + "px";
            //Try to run again in 25ms
            setTimeout( animate, Math.min(25,time-elapsed) );
        }else{
            e.style.cssText = originalStyle; //Restore original style
            if( oncomplete )
                oncomplete(e); //invoke completion callback
        }
    }
}

function fadeOut( e, oncomplete, time ){
    if( typeof e === "string" )
        e = document.getElementById(e);
    if( !time )
        time = 500;

    var ease = Math.sqrt;
    var start = ( new Date() ).getTime();
    animate();

    function animate(){
        var elapsed = ( new Date() ).getTime() - start ;
        var fraction = elapsed/time;
        if( fraction < 1 ){
            var opacity = 1 - ease( fraction );
            e.style.opacity = String(opacity);
            setTimeout( animate, Math.min( 25,time-elapsed) );
        }else{
            e.style.opacity = "0"; //fully transparent
            if( oncomplete )
                oncomplete(e);
        }
    }
}