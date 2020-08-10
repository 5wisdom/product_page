$(document).ready(function(){
    var $price = $(".pd_price span").text(); //현재 가격 정보를 저장
    console.log("현재 가격의 원본 정보 : " + $price);
    console.log("현재 가격의 원본 정보의 데이터 타입 : " + typeof $price);
    var $origin_price = $price.replace(",",""); //쉼표제거한 원본 숫자만 저장
    console.log("숫자정보의 값 : " + $origin_price);
    console.log("숫자정보의 데이터 타입 : " + typeof $origin_price);

    var $basic_price = parseFloat($origin_price); //숫자로변경
    //var $total_price;
    var $total_price_result = ""; //어차피 문자형이라서 기록하기위해
    var $opt_val = "";
    var $total_price_opt; //옵션값까지 더해진 가격
    var $num = $(".pd_count_box input").val();

    //함수재활용
    function calc_price(){
        // - + 한값
        $(".pd_count_box input").val($num); //1
        // $total_price = $basic_price * $num;

        // var $total_result = $total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // console.log($total_result);
     
        // $(".total_price_num span").text($total_result);

        //change이벤트 걸어서 나온값 옵션추가
        $opt_val = $(".pd_option select").val(); //0, 10000, 5000
       // console.log($opt_val);
        //console.log(typeof $opt_val); //string
       // $total_price = $basic_price * $num;
       // $total_price_opt = $total_price + parseFloat($opt_val);
        $total_price_opt = $basic_price * $num + parseFloat($opt_val);


        $total_price_result = $total_price_opt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //문자형으로 변경후 다 쪼갠후 역순으로 3번마다 띄워쓰기 한다음 거기를 ,로 변경해라
        console.log($total_price_result);

        //장바구니 -> 이미 안에서 계산이 다 되어있다가 active 붙여서 나올때 보면 이미 계산이 다 되어있다 
        $(".total_price_num span").text($total_price_result);
        var $detail_img = $(".pd_img img").attr("src");
        $(".cart_img img").attr("src",$detail_img);
        var $detail_title = $(".pd_title h3").text();
        $(".cart_info h4").text($detail_title);
        $(".buy_price span").text($total_price_result);

        var $sel_opt_txt = $(".pd_option select option:selected").text();
        $(".bottom_list p span").text($sel_opt_txt);
        var $opt_default = $(".pd_option select option:selected").attr("value");
        if($opt_default == "0"){ //문자데이터 0이라서 ""
            $(".bottom_list").hide();
        }else{
            $(".bottom_list").show();
        }

    };


    $(".pd_count_box a:first").click(function(){
        if($num < 2){//현재구매수량이 1일 경우, 작동 금지

        }else{ //현재 구매 수량이 2이상일 경우, 1씩 감소
            $num--; //10 -> 9 -> 8 ...-> 1
            // $(".pd_count_box input").val($num);
            // $total_price = $basic_price * $num;
            // $(".total_price_num span").text($total_price);
            calc_price();
        }
        return false;//a태그라서 써줌
    });
    $(".pd_count_box a:last").click(function(){
        $num++;
        // $(".pd_count_box input").val($num);
        // $total_price = $basic_price * $num;
        // $(".total_price_num span").text($total_price);
        calc_price();
        return false;
    });

    $(".pd_option select").change(function(){
        // var $opt_val = $(this).val();
        // console.log(typeof $opt_val);
        calc_price();
    });

    $(".pd_btn li:last-child input").click(function(){
        $(".mycart").addClass("active");
        $(".dark").addClass("active");
        //-,+,추가를 누를때 이미 계산이 다 될수 있도록 함수재활용에 넣음
        // var $detail_img = $(".pd_img img").attr("src");
        // $(".cart_img img").attr("src",$detail_img);
        // var $detail_title = $(".pd_title h3").text();
        // $(".cart_info h4").text($detail_title);
        // $(".buy_price span").text($total_price_result);

        // var $sel_opt_txt = $(".pd_option select option:selected").text();
        // $(".bottom_list p span").text($sel_opt_txt);
        // var $opt_default = $(".pd_option select option:selected").attr("value");
        // if($opt_default == "0"){ //문자데이터 0이라서 ""
        //     $(".bottom_list").hide();
        // }else{
        //     $(".bottom_list").show();
        // }
        calc_price(); //total_price가 계산이 안되므로 여기다가 써줘야함
    });

    $(".dark, .close_btn, .cart_btn li:last-child input").click(function(){
        $(".mycart").removeClass("active");
        $(".dark").removeClass("active");
    });


    //정규식 표현 /\B(?=(\d{3})+(?!\d))/g
    //#1. / ~ / : 정규식 표현의 시작과 끝
    //#2. \B : 공백처리(Blank)
    //#3. ?= : 내부의 정규식 실행문을 조합하여 결론 도출
    //#4. \d : (demension) 0 ~ 9까지의 숫자 데이터 만을 지정
    //#5. \d{3} : 좌측자리부터 세자리마다 패턴 구성
    //#6. ?!\d : 숫자 데이터 만을 지정 (!) .숫자를 세는 과정에서 역순으로 개수를 세겠다는 의미. 부정형 전방 탐색(역방향으로 셈)

    //(실수의 우측으로부터 첫번째 자리 숫자가 총 10개라면 10의 자리 순서까지 지정)
    //1000000000 =>앞부터 빈공간 100 000 000 0 =>역!  1 000 000 000 =>빈공간을 ,처리해라 1,000,000,000

    //#7. g : Global(글로벌) 정규 표현을 사용하겠다는 의미


});



