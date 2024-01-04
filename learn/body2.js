    $(function () {
      let defaultPlaybackSpeed = 1;
      createPlaybackSpeedSlider(defaultPlaybackSpeed);

      $('#scale').show();

      $('#account-dropdown-btn').click(function (e) {
        $('#account-dropdown-menu').css('display', 'block')
        $('#language-dropdown-menu').css('display', 'none')
        e.stopPropagation()
      })
      $(document).click(function (e) {
        $('#account-dropdown-menu').css('display', 'none')
      });
      //Mobile Design Related DOM Manipulations
      if (isMobile()) {
        $("#status").css({
          "bottom": "10%",
          "height": "12%",
          "max-height": "54px"
        });
        $("#current-action").css("bottom", "22%");
        $('#status-hide').remove();
        $('#left-bar').remove();
        $('#right-bar').remove();
        $("#mode-menu").remove();
        $("#codetrace").css("z-index", 1);
        $("#bottom-bar a").hide();
        $("#bottom-bar").css("height", $("#topbar").css("height"));
        $(".speed-dropup-btn").show();
        $('#scale').show();
        $("#go-to-beginning").remove();
        $("#go-to-end").remove();
        $("#pause").remove();
        $("#play").remove();
        $("#previous").remove();
        $("#next").remove();

        //make progress bar longer
        $("#progress-bar").css({
          left: "30%",
          width: "60%",
          'margin-left': 0
        })
      }
    })

    let mobilePlaybackOverlayTimeout;
    $(function () {
      $("#viz").on("click", () => {
        if (isMobile()) {
          if ($("#mobile-playback-overlay").is(":hidden") && isPlaying) {
            $("#mobile-playback-overlay").fadeIn();
            hideMobilePlaybackOverlay(6000);
          } else {
            $("#mobile-playback-overlay").fadeOut();
          }
        }
      });
      $("#mobile-playback-overlay").on("click", (event) => {
        if (event.target === event.currentTarget) //to ensure clicks on the controls dont fade the overlay
          $("#mobile-playback-overlay").fadeOut();
        else
          hideMobilePlaybackOverlay(5000);
      })
    });
    function hideMobilePlaybackOverlay(timeOut) {
      if (mobilePlaybackOverlayTimeout)
        clearTimeout(mobilePlaybackOverlayTimeout);
      mobilePlaybackOverlayTimeout = setTimeout(() => {
        $("#mobile-playback-overlay").fadeOut();
      }, timeOut);
    }
    function mobilePlaybackPauseOrPlay() {
      if ($("#mobile-playback-overlay").hasClass("playing")) {
        pause();
        hideMobilePlaybackOverlay(5000);
      } else {
        play();
        hideMobilePlaybackOverlay(3000);
      }
    }
    let rewindLabelTimeout, forwardLabelTimeout;
    function mobilePlaybackRewind() {
      $("#mobile-playback-rewind-label").css("opacity", 1);
      if (rewindLabelTimeout)
        clearTimeout(rewindLabelTimeout);
      rewindLabelTimeout = setTimeout(() => {
        $("#mobile-playback-rewind-label").css("opacity", 0);
      }, 800);
      stepBackward(7);
    }
    function mobilePlaybackForward() {
      $("#mobile-playback-forward-label").css("opacity", 1);
      if (forwardLabelTimeout)
        clearTimeout(forwardLabelTimeout);
      forwardLabelTimeout = setTimeout(() => {
        $("#mobile-playback-forward-label").css("opacity", 0);
      }, 800);
      stepForward(7);
    }

    //let eLectureSessionHistory = {};
    const sectorColors = ['#05a4d0', '#f1c706', '#fa0202'];
    function setSlideTimelineColor(slideNo) {
      const sectionNo = slideNo.split('-')[0];
      $(`[slideNo="${slideNo}"]`).css('background', sectorColors[(parseInt(sectionNo) % 3)]);
    }

    let currSlideTimer = null; //global so that we can clear the timeout when required

    const lectureIds = [{ "id": 75, "category": "sorting", "order": 1, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 1, "showCodetracePanel": 0, "created_at": "2017-02-12 21:12:52", "updated_at": "2023-06-06 06:32:49", "section": -1, "code": "$('#title-Bubble').click();\n$(\"#sort\").addClass(\"menu-highlighted\");\nchangeSortType(gw.bubbleSort, \"29,10,14,37,14\");", "section_order": -1, "value": "1", "text": "<p>Sorting is a very classic problem of reordering items (that can be compared, e.g., integers, floating-point numbers, strings, etc) of an array (or a list) in a certain order (increasing, non-decreasing (increasing or flat), decreasing, non-increasing (decreasing or flat), lexicographical, etc).<\/p><br><p>There are many different sorting algorithms, each has its own advantages and limitations.<\/p><br><p>Sorting is commonly used as the introductory problem in various Computer Science classes to showcase a range of algorithmic ideas.<\/p><br><p>Without loss of generality, we assume that we will sort only <b>Integers<\/b>, not necessarily distinct, in <b>non-decreasing order<\/b> in this visualization. Try clicking <span class=\"slide-actions\" onclick=\"doButtonAction11()\">Bubble Sort<\/span> for a sample animation of sorting the list of 5 jumbled integers (with duplicate) above.<\/p>", "title": "Sorting Problem and Sorting Algorithms" }, { "id": 541, "category": "sorting", "order": 1, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-05-31 08:07:04", "updated_at": "2023-06-06 06:33:00", "section": 75, "code": "", "section_order": 1, "value": "1-1", "text": "<p>Sorting problem has a variety of interesting algorithmic solutions that embody many Computer Science ideas:<\/p><ol><li><a href=\"?slide=5\"><u>Comparison<\/u><\/a> versus <a href=\"?slide=14\"><u>non-comparison<\/u><\/a> based strategies,<\/li><li>Iterative versus Recursive implementation,<\/li><li>Divide-and-Conquer paradigm (e.g., <a href=\"?slide=11-4\"><u>Merge Sort<\/u><\/a> or <a href=\"?slide=12-1\"><u>Quick Sort<\/u><\/a>),<\/li><li>Best\/Worst\/Average-case Time Complexity analysis,<\/li><li><a href=\"?slide=13\"><u>Randomized Algorithms<\/u><\/a>, etc.<\/li><\/ol>", "title": "Motivation - Interesting CS Ideas" }, { "id": 542, "category": "sorting", "order": 2, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-05-31 08:10:32", "updated_at": "2023-06-06 06:33:03", "section": 75, "code": "", "section_order": 1, "value": "1-2", "text": "<p>When an (integer) array <b>A<\/b> is sorted, many problems involving <b>A<\/b> become easy (or easier):<\/p><ol><li>Searching for a specific value <b>v<\/b> in array <b>A<\/b>,<\/li><li>Finding the min\/max or the k-th smallest\/largest value in (static) array <b>A<\/b>,<\/li><li>Testing for uniqueness and deleting duplicates in array <b>A<\/b>,<\/li><li>Counting how many time a specific value <b>v<\/b> appear in array <b>A<\/b>,<\/li><li>Set intersection\/union between array <b>A<\/b> and another sorted array <b>B<\/b>,<\/li><li>Finding a target pair <b>x<\/b> \u2208 <b>A<\/b> and <b>y<\/b> \u2208 <b>A<\/b> such that <b>x+y<\/b> equals to a target <b>z<\/b>,<\/li><li>Counting how many values in array <b>A<\/b> is inside range [<b>lo<\/b>..<b>hi<\/b>], etc.<\/li><\/ol><p>Discussion: In real-life classes, the instructor may elaborate more on these applications.<\/p>", "title": "Motivation - Applications" }, { "id": 769, "category": "sorting", "order": 3, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 1, "created_at": "2021-12-26 14:14:40", "updated_at": "2023-06-06 06:33:06", "section": 75, "code": "", "section_order": 1, "value": "1-3", "text": "<ol><li>We can use O(log <b>N<\/b>) binary search on a sorted array,<\/li><li>A[0]\/A[k-1]\/A[N-k]\/A[N-1] are the min\/k-th smallest\/k-th largest\/max value in (static sorted) array <b>A<\/b>,<\/li><li>Duplicates, if any, will be next to each other in a sorted array <b>A<\/b>,<\/li><li>Same as above,<\/li><li>We can use modifications of merge routine of Merge Sort,<\/li><li>We can use two pointers method,<\/li><li>The index of <b>y<\/b> - the index of <b>x<\/b> + 1 (use two binary searches).<\/ol><p>There can be other ways.<\/p>", "title": "Some Hints" }, { "id": 78, "category": "sorting", "order": 2, "top": "", "right": "", "bottom": "140px", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-02-13 04:46:36", "updated_at": "2022-01-04 13:27:08", "section": -1, "code": "$(\"#create\").click().addClass(\"menu-highlighted\");", "section_order": -1, "value": "2", "text": "<p class=\"notforprint\">There are two actions that you can do in this visualization.<\/p>", "title": "Actions" }, { "id": 544, "category": "sorting", "order": 1, "top": "", "right": "", "bottom": "140px", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 04:43:12", "updated_at": "2022-02-02 13:59:19", "section": 78, "code": "$(\"#create\").click().addClass(\"menu-highlighted\");", "section_order": 2, "value": "2-1", "text": "<p>The first action is about defining <b>your own<\/b> input, an array\/a list <b>A<\/b> that is:<\/p><ol><li>Totally random,<\/li><li>Random but sorted (in non-decreasing or non-increasing order),<\/li><li>Random but <b>nearly<\/b> sorted&nbsp;(in non-decreasing or non-increasing order),<\/li><li>Random and contain many duplicates (thus small range of integers), or<\/li><li>Defined solely by yourself.<\/li><\/ol><p class=\"notforprint\">In Exploration mode, you can experiment with various sorting algorithms provided in this visualization to figure out their best and worst case inputs.<\/p>", "title": "Define Your Own Input" }, { "id": 545, "category": "sorting", "order": 2, "top": "", "right": "", "bottom": "140px", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 04:45:26", "updated_at": "2022-01-05 02:18:17", "section": 78, "code": "$('#title-Bubble').click();\n$(\"#sort\").addClass(\"menu-highlighted\");", "section_order": 2, "value": "2-2", "text": "<div class=\"notforprint\"><p>The second action is the most important one: Execute the active sorting algorithm by clicking the \"Sort\" button.<\/p><br><p>Remember that you can switch active algorithm by clicking the <a href=\"?slide=4-1\"><u>respective abbreviation<\/u><\/a> on the top side of this visualization page.<\/p><\/div>", "title": "Execute the Selected Sorting Algorithm" }, { "id": 77, "category": "sorting", "order": 3, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-02-13 04:45:18", "updated_at": "2023-08-16 08:45:37", "section": -1, "code": "", "section_order": -1, "value": "3", "text": "<div class=\"notforprint\"><p>View the visualisation\/animation of the chosen sorting algorithm here.<\/p><br><p>Without loss of generality, we only show Integers in this visualization and our objective is to sort them from the initial state into non-decreasing order state. Remember, non-decreasing means mostly ascending (or increasing) order, but because there can be duplicates, there can be flat\/equal line between two adjacent equal integers.<\/p><\/div>", "title": "Visualisation" }, { "id": 76, "category": "sorting", "order": 4, "top": "70px", "right": "", "bottom": "", "left": "220px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-02-12 21:53:26", "updated_at": "2023-08-16 08:43:09", "section": -1, "code": "", "section_order": -1, "value": "4", "text": "<span class=\"notforprint\"><p>At the top, you will see the list of commonly taught sorting algorithms in Computer Science classes. To activate each algorithm, select the <a href=\"?slide=4-1\"><u>abbreviation<\/u><\/a> of respective algorithm name before clicking \"Sort\".<\/p><br><p>To facilitate more diversity, we randomize the active algorithm upon each page load.<\/p><\/span><br><p>The first six algorithms in this module are <b>comparison-based<\/b> sorting algorithms while the last two are not. We will discuss this idea <a href=\"?slide=13\"><u>midway through<\/u><\/a> this e-Lecture.<\/p><br><p>The middle three algorithms are <b>recursive<\/b> sorting algorithms while the rest are usually implemented iteratively.<\/p>", "title": "Common Sorting Algorithms" }, { "id": 540, "category": "sorting", "order": 1, "top": "70px", "right": "", "bottom": "", "left": "220px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-05-31 07:14:49", "updated_at": "2023-08-16 08:43:11", "section": 76, "code": "", "section_order": 4, "value": "4-1", "text": "<p>To save screen space, we abbreviate algorithm names into three characters each:<\/p><ol><li>Comparison-based Sorting Algorithms:<ol><li>BUB - Bubble Sort,<\/li><li>SEL - Selection Sort,<\/li><li>INS - Insertion Sort,<\/li><li>MER - Merge Sort (recursive implementation),<\/li><li>QUI - Quick Sort (recursive implementation),<\/li><li>R-Q - Random Quick Sort (recursive implementation).<\/li><\/ol><\/li><li>Not Comparison-based Sorting Algorithms:<ol><li>COU - Counting Sort,<\/li><li>RAD - Radix Sort.<\/li><\/ol><\/li><\/ol>", "title": "Abbreviations" }, { "id": 554, "category": "sorting", "order": 5, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 07:05:09", "updated_at": "2023-08-16 08:43:13", "section": -1, "code": "", "section_order": -1, "value": "5", "text": "<p>We will discuss three comparison-based sorting algorithms in the next few slides:<\/p><ol><li><a href=\"?slide=6\"><u>Bubble Sort<\/u><\/a>,<\/li><li><a href=\"?slide=7\"><u>Selection Sort<\/u><\/a>,<\/li><li><a href=\"?slide=8\"><u>Insertion Sort<\/u><\/a>.<\/li><\/ol><p>They are called <b>comparison-based<\/b> as they compare pairs of elements of the array and decide whether to swap them or not.<\/p><br><p>These three sorting algorithms are the easiest to implement but also not the most efficient, as they run in O(<b>N<\/b><sup>2<\/sup>).<\/p>", "title": "3 O(N^2) Comparison-based Sorting Algorithms" }, { "id": 735, "category": "sorting", "order": 6, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2020-10-06 04:41:02", "updated_at": "2023-08-16 08:43:16", "section": -1, "code": "", "section_order": -1, "value": "6", "text": "<p>Before we start with the discussion of various sorting algorithms, it may be a good idea to discuss the basics of asymptotic algorithm analysis, so that you can follow the discussions of the various O(<b>N<\/b>^2), O(<b>N<\/b> log <b>N<\/b>), and special O(<b>N<\/b>) sorting algorithms later.<\/p><br><p>This section can be skipped if you already know this topic.<\/p>", "title": "Analysis of Algorithms (Basics)" }, { "id": 736, "category": "sorting", "order": 1, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2020-10-06 04:43:03", "updated_at": "2023-08-16 08:43:18", "section": 735, "code": "", "section_order": 6, "value": "6-1", "text": "<p>You need to already understand\/remember all these:<br>-. Logarithm and Exponentiation, e.g., log<sub>2<\/sub>(1024) = 10, 2<sup>10<\/sup> = 1024<br>-. Arithmetic progression, e.g., 1+2+3+4+\u2026+10 = 10*11\/2 = 55<br>-. Geometric progression, e.g., 1+2+4+8+..+1024 = 1*(1-2<sup>11<\/sup>)\/(1-2) = 2047<br>-. Linear\/Quadratic\/Cubic function, e.g., f1(x) = x+2, f2(x) = x<sup>2<\/sup>+x-1, f3(x) = x<sup>3<\/sup>+2x<sup>2<\/sup>-x+7<br>-. Ceiling, Floor, and Absolute function, e.g., ceil(3.1) = 4, floor(3.1) = 3, abs(-7) = 7<\/p>", "title": "Mathematical Pre-requisites" }, { "id": 737, "category": "sorting", "order": 2, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2020-10-06 04:47:21", "updated_at": "2023-08-16 08:43:20", "section": 735, "code": "", "section_order": 6, "value": "6-2", "text": "<p>Analysis of Algorithm is a process to evaluate rigorously the resources (time and space) needed by an algorithm and represent the result of the evaluation with a (simple) formula.<\/p><br><p>The time\/space requirement of an algorithm is also called the time\/space complexity of the algorithm, respectively.<\/p><br><p>For this module, we focus more on time requirement of various sorting algorithms.<\/p>", "title": "What Is It?" }, { "id": 738, "category": "sorting", "order": 3, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2020-10-06 04:49:12", "updated_at": "2023-08-16 08:43:36", "section": 735, "code": "", "section_order": 6, "value": "6-3", "text": "<p>We can measure the actual running time of a program by using wall clock time or by inserting timing-measurement code into our program, e.g., see the code shown in <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SpeedTest.cpp\" target=\"_blank\"><u>SpeedTest.cpp<\/u><\/a> | <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SpeedTest.py\" target=\"_blank\"><u>py<\/u><\/a> | <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SpeedTest.java\" target=\"_blank\"><u>java<\/u><\/a>.<\/p><br><p>However, actual running time is not meaningful when comparing two algorithms as they are possibly coded in different languages, using different data sets, or running on different computers.<\/p>", "title": "Measuring the Actual Running Time?" }, { "id": 739, "category": "sorting", "order": 4, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2020-10-06 04:53:49", "updated_at": "2023-08-16 08:43:46", "section": 735, "code": "", "section_order": 6, "value": "6-4", "text": "<p>Instead of measuring the actual timing, we count the # of operations (arithmetic, assignment, comparison, etc). This is a way to assess its efficiency as an algorithm&#39;s execution time is correlated to the # of operations that it requires.<\/p><br><p>See the code shown in <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SpeedTest.cpp\" target=\"_blank\"><u>SpeedTest.cpp<\/u><\/a> | <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SpeedTest.py\" target=\"_blank\"><u>py<\/u><\/a> | <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SpeedTest.java\" target=\"_blank\"><u>java<\/u><\/a> and the comments (especially on how to get the final value of variable counter).<\/p><br><p>Knowing the (precise) number of operations required by the algorithm, we can state something like this: Algorithm <b>X<\/b> takes <b>2n<sup>2<\/sup> + 100n<\/b> operations to solve problem of size <b>n<\/b>.<\/p>", "title": "Counting # of Operations (1)" }, { "id": 740, "category": "sorting", "order": 5, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2020-10-06 04:55:58", "updated_at": "2023-08-16 08:54:54", "section": 735, "code": "", "section_order": 6, "value": "6-5", "text": "<p>If the time <b>t<\/b> needed for one operation is known, then we can state that algorithm <b>X<\/b> takes <b>(2n<sup>2<\/sup> + 100n)t<\/b> time units to solve problem of size <b>n<\/b>.<\/p><br><p>However, time <b>t<\/b> is dependent on the factors mentioned earlier, e.g., different languages, compilers and computers, the complexity of the operation itself (addition\/subtraction is easier\/faster to compute than multiplication\/division), etc.<\/p><br><p>Therefore, instead of tying the analysis to actual time <b>t<\/b>, we can state that algorithm <b>X<\/b> takes time that is <b>proportional to 2n<sup>2<\/sup> + 100n<\/b> to solving problem of size <b>n<\/b>.<\/p>", "title": "Counting # of Operations (2)" }, { "id": 741, "category": "sorting", "order": 6, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2020-10-06 04:58:45", "updated_at": "2023-08-23 04:53:39", "section": 735, "code": "", "section_order": 6, "value": "6-6", "text": "<p><a href=\"https:\/\/www.collinsdictionary.com\/dictionary\/english\/asymptotic\" target=\"_blank\"><u>Asymptotic<\/u><\/a> analysis is an analysis of algorithms that focuses on analyzing problems of <b>large input size n<\/b>, considers <b>only the leading term<\/b> of the formula, and <b>ignores the coefficient<\/b> of the leading term.<\/p><br><p>We choose the leading term because the lower order terms contribute lesser to the overall cost as the input grows larger, e.g., for f(n) = 2n<sup>2<\/sup> + 100n, we have:<br>f(1000) = 2*1000<sup>2<\/sup> + 100*1000 = 2.1M, vs<br>f(100000) = 2*100000<sup>2<\/sup> + 100*100000 = 20010M.<br>(notice that the lower order term 100n has lesser contribution).<\/p>", "title": "Asymptotic Analysis" }, { "id": 742, "category": "sorting", "order": 7, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2020-10-06 05:04:16", "updated_at": "2023-08-16 08:43:55", "section": 735, "code": "", "section_order": 6, "value": "6-7", "text": "<p>Suppose two algorithms have 2n<sup>2<\/sup> and 30n<sup>2<\/sup> as the leading terms, respectively.<\/p><br><p>Although actual time will be different due to the different constants, the growth rates of the running time are the same.<\/p><br><p>Compared with another algorithm with leading term of n<sup>3<\/sup>, the difference in growth rate is a much more dominating factor.<\/p><br><p>Hence, we can drop the coefficient of leading term when studying algorithm complexity.<\/p>", "title": "Ignoring Coefficient of the Leading Term" }, { "id": 743, "category": "sorting", "order": 8, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2020-10-06 05:06:54", "updated_at": "2023-08-16 08:43:58", "section": 735, "code": "", "section_order": 6, "value": "6-8", "text": "<p>If algorithm A requires time proportional to <b>f(n)<\/b>, we say that algorithm A is of the order of f(n).<\/p><br><p>We write that algorithm A has time complexity of <b>O(f(n))<\/b>, where <b>f(n)<\/b> is the growth rate function for algorithm A.<\/p>", "title": "Upper Bound: The Big-O Notation" }, { "id": 746, "category": "sorting", "order": 9, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2020-10-06 05:19:30", "updated_at": "2023-08-16 08:44:00", "section": 735, "code": "", "section_order": 6, "value": "6-9", "text": "<p>Mathematically, an algorithm A is of O(<b>f(n)<\/b>) if there exist a constant <b>k<\/b> and a positive integer <b>n0<\/b> such that algorithm A requires no more than <b>k*f(n)<\/b> time units to solve a problem of size <b>n \u2265 n0<\/b>, i.e., when the problem size is larger than <b>n0<\/b>, then algorithm A is (always) bounded from above by this simple formula <b>k*f(n)<\/b>.<\/p><br><center><img src=\"https:\/\/visualgo.net\/img\/big_O_notation.png\" width=\"300\" alt=\"Big-O Notation\"><\/center><br><p>Note that: <b>n0<\/b> and <b>k<\/b> are not unique and there can be many possible valid <b>f(n)<\/b>.<\/p>", "title": "Big-O Notation (Mathematics)" }, { "id": 744, "category": "sorting", "order": 10, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2020-10-06 05:08:38", "updated_at": "2023-08-16 08:44:03", "section": 735, "code": "", "section_order": 6, "value": "6-10", "text": "<p>In asymptotic analysis, a formula can be simplified to a single term with coefficient 1.<\/p><br><p>Such a term is called a growth term (rate of growth, order of growth, order of magnitude).<\/p><br><p>The most common growth terms can be ordered from fastest to slowest as follows:<br>O(<b>1<\/b>)\/constant time &lt; O(log <b>n<\/b>)\/logarithmic time &lt; O(<b>n<\/b>)\/linear time &lt;<br>O(<b>n<\/b> log <b>n<\/b>)\/quasilinear time &lt; O(<b>n<\/b><sup>2<\/sup>)\/quadratic time &lt; O(<b>n<\/b><sup>3<\/sup>)\/cubic time &lt;<br>O(2<sup><b>n<\/b><\/sup>)\/exponential time &lt; O(<b>n<\/b>!)\/also-exponential time &lt; &infin; (e.g., an infinite loop).<\/p><br><p>Note that a few other common time complexities are not shown (also see the visualization in the next slide).<\/p>", "title": "Growth Terms" }, { "id": 745, "category": "sorting", "order": 11, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2020-10-06 05:15:27", "updated_at": "2023-08-16 08:44:06", "section": 735, "code": "", "section_order": 6, "value": "6-11", "text": "<img src=\"https:\/\/visualgo.net\/img\/growth_rates.png\" width=\"500\" alt=\"Common Growth Terms\"><br><p>We will see three different growth rates O(<b>n<sup>2<\/sup><\/b>), O(<b>n log n<\/b>), and O(<b>n<\/b>) throughout the remainder of this sorting module.<\/p>", "title": "Growth Terms (Visualized\/Compared)" }, { "id": 175, "category": "sorting", "order": 7, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-03-26 15:14:08", "updated_at": "2023-08-16 08:45:49", "section": -1, "code": "$('#title-Bubble').click();\n$(\"#sort\").addClass(\"menu-highlighted\");\nchangeSortType(gw.bubbleSort, \"29,10,14,37,14\");", "section_order": -1, "value": "7", "text": "<p>Given an array of <b>N<\/b> elements, Bubble Sort will:<\/p><ol><li><b>Compare<\/b> a pair of adjacent items (a, b),<\/li><li>Swap that pair if the items are out of order (in this case, when a &gt; b),<\/li><li>Repeat Step 1 and 2 until we reach the end of array<br>(the last pair is the (<b>N<\/b>-2)-th and (<b>N<\/b>-1)-th items as we use 0-based indexing),<\/li><li>By now, the largest item will be at the last position.<br>We then reduce <b>N<\/b> by 1 and repeat Step 1 until we have <b>N = 1<\/b>.<\/li><\/ol><span class=\"notforprint\"><p>Without further ado, let&#39;s try <span class=\"slide-actions\" onclick=\"doButtonAction11()\">Bubble Sort<\/span> on the small example array [29, 10, 14, 37, 14].<\/p><br><p>You should see a &#39;bubble-like&#39; animation if you imagine the larger items &#39;bubble up&#39; (actually &#39;float to the right side of the array&#39;).<\/p><\/span>", "title": "Bubble Sort" }, { "id": 206, "category": "sorting", "order": 1, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-04-10 05:36:47", "updated_at": "2023-08-16 09:08:39", "section": 175, "code": "$('#title-Bubble').click();\n$(\"#sort\").addClass(\"menu-highlighted\");\nchangeSortType(gw.bubbleSort, \"29,10,14,37,14\");", "section_order": 7, "value": "7-1", "text": "<pre>method bubbleSort(array A, integer N) \/\/ the standard version<br>  for each R from N-1 down to 1 \/\/ repeat for N-1 iterations<br>    for each index i in [0..R-1] \/\/ the &#39;unsorted region&#39;, O(N)<br>      if A[i] > A[i+1] \/\/ these two are not in non-decreasing order<br>        swap(a[i], a[i+1]) \/\/ swap them in O(1)<\/pre><p>Comparison and swap require time that is bounded by a constant, let&#39;s call it <b>c<\/b>. Then, there are two nested loops in (the standard) Bubble Sort. The outer loop runs for exactly <b>N-1<\/b> iterations. But the inner loop runs get shorter and shorter:<\/p><ol><li>When R=<b>N<\/b>-1, (<b>N<\/b>\u22121) iterations (of comparisons and possibly swaps),<\/li><li>When R=<b>N<\/b>-2, (<b>N<\/b>\u22122) iterations,<br>...,<\/li><li>When R=1, 1 iteration (then done).<\/li><\/ol><p>Thus, the total number of iterations = (<b>N<\/b>\u22121)+(<b>N<\/b>\u22122)+...+1 = <b>N<\/b>*(<b>N<\/b>\u22121)\/2 (<a href=\"https:\/\/en.wikipedia.org\/wiki\/Arithmetic_progression#Sum\" target=\"_blank\"><u>derivation<\/u><\/a>).<\/p><p>Total time = c*<b>N<\/b>*(<b>N<\/b>\u22121)\/2 = O(<b>N<\/b>^2).<\/p><br><p>See the code shown in <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SortingDemo.cpp\" target=\"_blank\"><u>SortingDemo.cpp<\/u><\/a> | <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SortingDemo.py\" target=\"_blank\"><u>py<\/u><\/a> | <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SortingDemo.java\" target=\"_blank\"><u>java<\/u><\/a>.<\/p>", "title": "Bubble Sort, Pseudocode &amp; Analysis" }, { "id": 207, "category": "sorting", "order": 2, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-04-10 05:39:59", "updated_at": "2023-08-16 09:05:41", "section": 175, "code": "$('#title-Bubble').click();\n$(\"#sort\").addClass(\"menu-highlighted\");\nchangeSortType(gw.bubbleSort, \"3,6,11,25,39\");", "section_order": 7, "value": "7-2", "text": "<p>Bubble Sort is actually inefficient with its <b>O(N^2)<\/b> time complexity. Imagine that we have <b>N<\/b> = 10<sup>5<\/sup> numbers. Even if our computer is super fast and can compute 10<sup>8<\/sup> operations in 1 second, Bubble Sort will need about 100 seconds to complete.<\/p><br><p>However, it can be terminated early, e.g., on the small sorted ascending example shown above [3, 6, 11, 25, 39], <span class=\"slide-actions\" onclick=\"doButtonAction11()\">Bubble Sort<\/span> can terminates in O(<b>N<\/b>) time.<\/p><br><p>The improvement idea is simple: If we go through the inner loop with <b>no swapping<\/b> at all, it means that the array is <b>already sorted<\/b> and we can stop Bubble Sort at that point.<\/p><br><p>Discussion: Although it makes Bubble Sort runs faster in general cases, this improvement idea does not change <b>O(N^2)<\/b> time complexity of Bubble Sort... Why?<\/p>", "title": "Bubble Sort: Early Termination" }, { "id": 543, "category": "sorting", "order": 3, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 1, "created_at": "2017-05-31 09:26:35", "updated_at": "2023-08-16 08:45:56", "section": 175, "code": "$('#title-Bubble').click();\n$(\"#sort\").addClass(\"menu-highlighted\");", "section_order": 7, "value": "7-3", "text": "<p>Try <span class=\"slide-actions\" onclick=\"doButtonAction33()\">Bubble Sort Extreme Case<\/span> where we run Bubble Sort on a small reverse sorted input array. We will encounter the O(<b>N<\/b><sup>2<\/sup>) time complexity again.<\/p><br><p>Note that running Bubble Sort on a `nearly sorted&#39; array like [2,3,4,5,6,...,1] will also make this Optimized Bubble Sort still runs in O(<b>N<\/b><sup>2<\/sup>).<\/p>", "title": "The Answer" }, { "id": 176, "category": "sorting", "order": 8, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-03-26 15:26:17", "updated_at": "2023-08-16 09:05:57", "section": -1, "code": "$('#title-Selection').click();\n$(\"#sort\").addClass(\"menu-highlighted\");\nchangeSortType(gw.selectionSort, \"29,10,14,37,13\");", "section_order": -1, "value": "8", "text": "<p>Given an array of <b>N<\/b> items and <b>L<\/b> = 0, Selection Sort will:<\/p><ol><li>Find the position <b>X<\/b> of the smallest item&nbsp;in the range of [<b>L<\/b>...<b>N<\/b>\u22121],<\/li><li>Swap <b>X<\/b>-th item with the <b>L<\/b>-th item,<\/li><li>Increase the lower-bound <b>L<\/b> by 1 and repeat Step 1 until <b>L<\/b> = <b>N<\/b>-2.<\/li><\/ol><p class=\"notforprint\">Let&#39;s try <span class=\"slide-actions\" onclick=\"doButtonAction8()\">Selection Sort<\/span> on the same small example array [29, 10, 14, 37, 13].<\/p><br><p>Without loss of generality, we can also implement Selection Sort in reverse:<br>Find the position of the largest item <b>Y<\/b> and swap it with the last item.<\/p>", "title": "Selection Sort" }, { "id": 187, "category": "sorting", "order": 1, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-03-26 20:35:19", "updated_at": "2023-08-16 09:11:30", "section": 176, "code": "$('#title-Selection').click();\n$(\"#sort\").addClass(\"menu-highlighted\");\nchangeSortType(gw.selectionSort, \"29,10,14,37,13\");", "section_order": 8, "value": "8-1", "text": "<pre>method selectionSort(array A[], integer N)<br>  for each L in [0..N-2] \/\/ O(<b>N<\/b>)<br>    let X be the index of the minimum element in A[L..N-1] \/\/ O(<b>N<\/b>)<br>    swap(A[X], A[L]) \/\/ O(1), X may be equal to L (no actual swap)<\/pre><p>Total: O(<b>N<\/b><sup>2<\/sup>) \u2014 To be precise, it is similar to <a href=\"?slide=7-1\"><u>Bubble Sort analysis<\/u><\/a>.<\/p><br><p>See the code shown in <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SortingDemo.cpp\" target=\"_blank\"><u>SortingDemo.cpp<\/u><\/a> | <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SortingDemo.py\" target=\"_blank\"><u>py<\/u><\/a> | <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SortingDemo.java\" target=\"_blank\"><u>java<\/u><\/a>.<\/p>", "title": "Selection Sort, Pseudocode &amp; Analysis" }, { "id": 202, "category": "sorting", "order": 2, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-04-10 05:00:02", "updated_at": "2023-08-16 09:12:24", "section": 176, "code": "$('#title-Selection').click();\n$(\"#sort\").addClass(\"menu-highlighted\");\nchangeSortType(gw.selectionSort, \"29,10,14,37,13\");", "section_order": 8, "value": "8-2", "text": "<span class=\"notforprint\"><input class=\"mcq-answer\" id=\"mcq-answer-4\" value=\"26\" hidden><p>Quiz: <b>How many (real) swaps are required to sort [29, 10, 14, 37, 13] by Selection Sort?<\/b><\/p><form><input type=\"radio\" name=\"mcq-4-choice\" value=\"26\"> 3<br><input type=\"radio\" name=\"mcq-4-choice\" value=\"24\"> 1<br><input type=\"radio\" name=\"mcq-4-choice\" value=\"25\"> 2<br><input type=\"radio\" name=\"mcq-4-choice\" value=\"27\"> 4<br><\/form><button class=\"mcq-submit\" id=\"submit-4\">Submit<\/button> <span id=\"answer-status-4\"><\/span><\/span>", "title": "Mini Quiz" }, { "id": 178, "category": "sorting", "order": 9, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-03-26 18:14:12", "updated_at": "2023-09-18 10:38:56", "section": -1, "code": "$('#title-Insertion').click();\n$(\"#sort\").addClass(\"menu-highlighted\");\nchangeSortType(gw.insertionSort, \"6,2,10,7\");", "section_order": -1, "value": "9", "text": "<p>Insertion sort is similar to how most people arrange a hand of poker cards. <img src=\"\/img\/insertion_sort.png\" alt=\"Insertion Sort Illustration\" style=\"width: 500px\"><\/p><ol><li>Start with one card in your hand,<\/li><li>Pick the next card and insert it into its proper sorted order,<\/li><li>Repeat previous step for all cards.<\/li><\/ol><p class=\"notforprint\">Let&#39;s try <span class=\"slide-actions\" onclick=\"doButtonAction10()\">Insertion Sort<\/span> on the small example array [6, 2, 10, 7].<\/p>", "title": "Insertion Sort" }, { "id": 203, "category": "sorting", "order": 1, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-04-10 05:20:19", "updated_at": "2023-10-22 13:04:54", "section": 178, "code": "$('#title-Insertion').click();\n$(\"#sort\").addClass(\"menu-highlighted\");\nchangeSortType(gw.insertionSort, \"40,13,20,8\");", "section_order": 9, "value": "9-1", "text": "<pre>method insertionSort(array A[], integer N)<br>  for i in [1..N-1] \/\/ O(N)<br>    let X be A[i] \/\/ X is the next item to be inserted into A[0..i-1]<br>    for j from i-1 down to 0 \/\/ this loop can be fast or slow<br>      if A[j] &gt; X<br>        A[j+1] = A[j] \/\/ make a place for X<br>      else<br>        break<br>    A[j+1] = X \/\/ insert X at index j+1<\/pre><p>See the code shown in <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SortingDemo.cpp\" target=\"_blank\"><u>SortingDemo.cpp<\/u><\/a> | <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SortingDemo.py\" target=\"_blank\"><u>py<\/u><\/a> | <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SortingDemo.java\" target=\"_blank\"><u>java<\/u><\/a>.<\/p>", "title": "Insertion Sort, Pseudocode and Analysis 1" }, { "id": 204, "category": "sorting", "order": 2, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-04-10 05:23:45", "updated_at": "2023-08-16 09:12:31", "section": 178, "code": "$('#title-Insertion').click();\n$(\"#sort\").addClass(\"menu-highlighted\");\nchangeSortType(gw.insertionSort, \"40,13,20,8\");", "section_order": 9, "value": "9-2", "text": "<p>The outer loop executes <b>N<\/b>\u22121 times, that&#39;s quite clear.<\/p><br><p>But the number of times the inner-loop is executed depends on the input:<\/p><ol><li>In best-case scenario, the array is already sorted and (a[j] &gt; X) is always false<br>So no shifting of data is necessary and the inner loop runs in O(<b>1<\/b>),<\/li><li>In worst-case scenario, the array is reverse sorted and (a[j] &gt; X) is always true<br>Insertion always occur at the front of the array and the inner loop runs in O(<b>N<\/b>).<\/li><\/ol><p>Thus, the best-case time is O(<b>N &times;  1<\/b>) = O(<b>N<\/b>) and the worst-case time is O(<b>N &times; N<\/b>) = O(<b>N<\/b><sup>2<\/sup>).<\/p>", "title": "Insertion Sort: Analysis 2" }, { "id": 205, "category": "sorting", "order": 3, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-04-10 05:27:56", "updated_at": "2023-08-16 09:12:34", "section": 178, "code": "$('#title-Insertion').click();\n$(\"#sort\").addClass(\"menu-highlighted\");\nchangeSortType(gw.insertionSort, \"40,13,20,8\");", "section_order": 9, "value": "9-3", "text": "<span class=\"notforprint\"><input class=\"mcq-answer\" id=\"mcq-answer-5\" value=\"31\" hidden><p>Quiz: <b>What is the complexity of Insertion Sort on any input array?<\/b><\/p><form><input type=\"radio\" name=\"mcq-5-choice\" value=\"29\"> O(N)<br><input type=\"radio\" name=\"mcq-5-choice\" value=\"28\"> O(1)<br><input type=\"radio\" name=\"mcq-5-choice\" value=\"30\"> O(N log N)<br><input type=\"radio\" name=\"mcq-5-choice\" value=\"31\"> O(N^2)<br><\/form><button class=\"mcq-submit\" id=\"submit-5\">Submit<\/button> <span id=\"answer-status-5\"><\/span><br><br><p>Ask your instructor if you are not clear on this or read similar remarks on <a href=\"?slide=11-10\"><u>this slide<\/u><\/a>.<\/p><\/span>", "title": "Mini Quiz" }, { "id": 555, "category": "sorting", "order": 10, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 07:08:40", "updated_at": "2023-08-16 08:44:21", "section": -1, "code": "", "section_order": -1, "value": "10", "text": "<p>We will discuss two (and a half) comparison-based sorting algorithms soon:<\/p><ol><li><a href=\"?slide=11\"><u>Merge Sort<\/u><\/a>,<\/li><li><a href=\"?slide=12\"><u>Quick Sort<\/u><\/a> and its <a href=\"?slide=13\"><u>Randomized version<\/u><\/a> (which only has one change).<\/li><\/ol><p>These sorting algorithms are usually implemented recursively, use Divide and Conquer problem solving paradigm, and run in O(<b>N<\/b> log <b>N<\/b>) time for Merge Sort and O(<b>N<\/b> log <b>N<\/b>) time <i>in expectation<\/i> for Randomized Quick Sort.<\/p><br><p>PS: The non-randomized version of Quick Sort runs in O(<b>N<sup>2<\/sup><\/b>) though.<\/p>", "title": "2.5 O(N log N) Comparison-based Sorting" }, { "id": 179, "category": "sorting", "order": 11, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-03-26 18:30:57", "updated_at": "2023-08-21 09:32:39", "section": -1, "code": "$('#title-Merge').click();", "section_order": -1, "value": "11", "text": "<p>Given an array of <b>N<\/b> items, Merge Sort will:<\/p><ol><li>Merge each pair of individual element (which is by default, sorted) into sorted arrays of 2 elements,<\/li><li>Merge each pair of sorted arrays of 2 elements into sorted arrays of 4 elements,<br>Repeat the process...,<\/li><li>Final step: Merge 2 sorted arrays of <b>N<\/b>\/2 elements (for simplicity of this discussion, we assume that <b>N<\/b> is even) to obtain a fully sorted array of <b>N<\/b> elements.<\/li><\/ol><p>This is just the general idea and we need a few more details before we can discuss the true form of Merge Sort.<\/p>", "title": "Merge Sort" }, { "id": 546, "category": "sorting", "order": 1, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 05:12:46", "updated_at": "2023-08-21 09:32:41", "section": 179, "code": "$('#title-Merge').click();\nchangeSortType(gw.mergeSort, \"1,5,19,20,2,11,15,17\");", "section_order": 11, "value": "11-1", "text": "<p>We will dissect this Merge Sort algorithm by first discussing its most important sub-routine: The O(<b>N<\/b>) <samp>merge<\/samp>.<\/p><br><p>Given two sorted array, A and B, of size <b>N<sub>1<\/sub><\/b> and <b>N<sub>2<\/sub><\/b>, we can efficiently merge them into one larger combined sorted array of size <b>N<\/b> = <b>N<sub>1<\/sub><\/b>+<b>N<sub>2<\/sub><\/b>, in O(<b>N<\/b>) time.<\/p><br><p>This is achieved by simply comparing the front of the two arrays and take the smaller of the two at all times. However, this simple but fast O(<b>N<\/b>) <samp>merge<\/samp> sub-routine will need additional array to do this merging correctly.<\/p>", "title": "Important Subroutine, O(N) Merge" }, { "id": 550, "category": "sorting", "order": 2, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 07:02:01", "updated_at": "2023-08-21 09:48:14", "section": 179, "code": "$('#title-Merge').click();\nchangeSortType(gw.mergeSort, \"1,5,19,20,2,11,15,17\");", "section_order": 11, "value": "11-2", "text": "<pre>method merge(array A, integer low, integer mid, integer high)<br>  \/\/ subarray1 = a[low..mid], subarray2 = a[mid+1..high], both sorted<br>  int N = high-low+1<br>  create array B of size N \/\/ discuss: why do we need a temp array b?<br>  int left = low, right = mid+1, bIdx = 0<br>  while (left &lt;= mid &amp;&amp; right &lt;= high) \/\/ the merging<br>    if (A[left] &lt;= A[right])<br>      B[bIdx++] = A[left++] <br>    else<br>      B[bIdx++] = A[right++]<br>  while (left &lt;= mid)<br>    B[bIdx++] = A[left++] \/\/ leftover, if any<br>  while (right &lt;= high)<br>    B[bIdx++] = A[right++] \/\/ leftover, if any<br>  for (int k = 0; k &lt; N; ++k)<br>    A[low+k] = B[k]; \/\/ copy back<\/pre><p class=\"notforprint\">Try <span class=\"slide-actions\" onclick=\"doButtonAction12()\">Merge Sort<\/span> on the example array [1, 5, 19, 20, 2, 11, 15, 17] that have its first half already sorted [1, 5, 19, 20] and its second half also already sorted [2, 11, 15, 17]. Concentrate on the last merge of the Merge Sort algorithm.<\/p>", "title": "Merge Subroutine Pseudocode Implementation" }, { "id": 547, "category": "sorting", "order": 3, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 06:16:03", "updated_at": "2023-08-21 09:32:47", "section": 179, "code": "$('#title-Merge').click();", "section_order": 11, "value": "11-3", "text": "<p>Before we continue, let&#39;s talk about Divide and Conquer (abbreviated as D&amp;C), a powerful problem solving paradigm.<\/p><br><p>Divide and Conquer algorithm solves (certain kind of) problem \u2014 like our sorting problem \u2014 in the following steps:<\/p><ol><li>Divide step: Divide the large, original problem into smaller sub-problems and recursively solve the smaller sub-problems,<\/li><li>Conquer step: Combine the results of the smaller sub-problems to produce the result of the larger, original problem.<\/li><\/ol>", "title": "Divide and Conquer Paradigm" }, { "id": 549, "category": "sorting", "order": 4, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 07:01:32", "updated_at": "2023-08-21 09:32:50", "section": 179, "code": "$('#title-Merge').click();", "section_order": 11, "value": "11-4", "text": "<p>Merge Sort is a Divide and Conquer sorting algorithm.<\/p><br><p>The divide step is simple: Divide the current array into two halves (perfectly equal if <b>N<\/b> is even or one side is slightly greater by one element if <b>N<\/b> is odd) and then recursively sort the two halves.<\/p><br><p>The conquer step is the one that does the most work: Merge the two (sorted) halves to form a sorted array, using the merge sub-routine <a href=\"?slide=11-2\"><u>discussed earlier<\/u><\/a>.<\/p>", "title": "Merge Sort as a D&C Algorithm" }, { "id": 567, "category": "sorting", "order": 5, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 08:28:03", "updated_at": "2023-08-21 09:44:09", "section": 179, "code": "$('#title-Merge').click();", "section_order": 11, "value": "11-5", "text": "<pre>method mergeSort(array A, integer low, integer high)<br>  \/\/ the array to be sorted is A[low..high]<br>  if (low &lt; high) \/\/ base case: low &gt;= high (0 or 1 item)<br>    int mid = (low+high) \/ 2\t<br>    mergeSort(a, low  , mid ) \/\/ divide into two halves<br>    mergeSort(a, mid+1, high) \/\/ then recursively sort them<br>    merge(a, low, mid, high) \/\/ conquer: the merge subroutine<\/pre><p>See the code shown in <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SortingDemo.cpp\" target=\"_blank\"><u>SortingDemo.cpp<\/u><\/a> | <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SortingDemo.py\" target=\"_blank\"><u>py<\/u><\/a> | <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SortingDemo.java\" target=\"_blank\"><u>java<\/u><\/a>.<\/p>", "title": "Merge Sort Pseudocode Implementation" }, { "id": 548, "category": "sorting", "order": 6, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 07:01:19", "updated_at": "2023-08-21 09:32:55", "section": 179, "code": "$('#title-Merge').click();\nchangeSortType(gw.mergeSort, \"7,2,6,3,8,4,5\");", "section_order": 11, "value": "11-6", "text": "<p>Contrary to what many other CS printed textbooks usually show (as textbooks are static), the actual execution of Merge Sort does <b>not<\/b> split to two subarrays <b>level by level<\/b>, but it will recursively sort the <b>left<\/b> subarray first before dealing with the <b>right<\/b> subarray.<\/p><br><p>That&#39;s it, running <span class=\"slide-actions\" onclick=\"doButtonAction12()\">Merge Sort<\/span> on the example array [7, 2, 6, 3, 8, 4, 5], it will recurse to [7, 2, 6, 3], then [7, 2], then [7] (a single element, sorted by default), backtrack, recurse to [2] (sorted), backtrack, then finally merge [7, 2] into [2, 7], before it continue processing [6, 3] and so on.<\/p>", "title": "Demonstration" }, { "id": 551, "category": "sorting", "order": 7, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 07:03:34", "updated_at": "2023-08-21 09:33:00", "section": 179, "code": "$('#title-Merge').click();", "section_order": 11, "value": "11-7", "text": "<p>In Merge Sort, the bulk of work is done in the conquer\/merge step as the divide step does not really do anything (treated as O(<b>1<\/b>)).<\/p><br><p>When we call <samp>merge(a, low, mid, high)<\/samp>, we process <b>k = (high-low+1)<\/b> items.<br>There will be at most <b>k-1<\/b> comparisons.<br>There are <b>k<\/b> moves from original array <b>a<\/b> to temporary array <b>b<\/b> and another <b>k<\/b> moves back.<br>In total, number of operations inside <samp>merge<\/samp> sub-routine is &lt; 3<b>k<\/b>-1 = O(<b>k<\/b>).<\/p><br><p>The important question is how many times this <samp>merge<\/samp> sub-routine is called?<\/p>", "title": "Merge Sort: Analysis Part 1" }, { "id": 552, "category": "sorting", "order": 8, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 07:03:58", "updated_at": "2023-09-18 10:36:13", "section": 179, "code": "$('#title-Merge').click();", "section_order": 11, "value": "11-8", "text": "<img src=\"\/img\/merge.png\" width=\"500\" alt=\"The Recursion Tree of Merge Sort\">", "title": "Merge Sort: Analysis Part 2" }, { "id": 553, "category": "sorting", "order": 9, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 07:04:24", "updated_at": "2023-08-21 09:33:05", "section": 179, "code": "$('#title-Merge').click();", "section_order": 11, "value": "11-9", "text": "<p>Level 1: 2^0=1 calls to merge() with <b>N<\/b>\/2^1 items each, O(2^0 x 2 x <b>N<\/b>\/2^1) = O(<b>N<\/b>)<br>Level 2: 2^1=2 calls to merge() with <b>N<\/b>\/2^2 items each, O(2^1 x 2 x <b>N<\/b>\/2^2) = O(<b>N<\/b>)<br>Level 3: 2^2=4 calls to merge() with <b>N<\/b>\/2^3 items each, O(2^2 x 2 x <b>N<\/b>\/2^3) = O(<b>N<\/b>)<br>...<br>Level (log <b>N<\/b>): 2^(log <b>N<\/b>-1) (or <b>N<\/b>\/2) calls to merge() with <b>N<\/b>\/2^log <b>N<\/b> (or 1) item each, O(<b>N<\/b>)<\/p><br><p>There are log <b>N<\/b> levels and in each level, we perform O(<b>N<\/b>) work, thus the overall time complexity is O(<b>N<\/b> log <b>N<\/b>). We will <a href=\"?slide=14-1\"><u>later<\/u><\/a> see that this is an optimal (comparison-based) sorting algorithm, i.e., we cannot do better than this.<\/p>", "title": "Merge Sort: Analysis Part 3" }, { "id": 566, "category": "sorting", "order": 10, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 07:20:32", "updated_at": "2023-08-21 09:33:07", "section": 179, "code": "", "section_order": 11, "value": "11-10", "text": "<p>The most important good part of Merge Sort is its O(<b>N<\/b> log <b>N<\/b>) performance guarantee, regardless of the original ordering of the input. That&#39;s it, there is <b>no<\/b> adversary test case that can make Merge Sort runs longer than O(<b>N<\/b> log <b>N<\/b>) for <b>any<\/b> array of <b>N<\/b> elements.<\/p><br><p>Merge Sort is therefore very suitable to sort extremely large number of inputs as O(<b>N<\/b> log <b>N<\/b>) grows much slower than the O(<b>N<\/b><sup>2<\/sup>) sorting algorithms that we have <a href=\"?slide=5\"><u>discussed earlier<\/u><\/a>.<\/p><br><p>There are however, several not-so-good parts of Merge Sort. First, it is actually not easy to implement from scratch (<a href=\"?slide=19-3\"><u>but we don&#39;t have to<\/u><\/a>). Second, it requires additional O(<b>N<\/b>) storage during <a href=\"?slide=11-2\"><u>merging operation<\/u><\/a>, thus not really memory efficient and <a href=\"?slide=17-1\"><u>not in-place<\/u><\/a>. Btw, if you are interested to see what have been done to address these (classic) Merge Sort not-so-good parts, you can read <a href=\"https:\/\/en.wikipedia.org\/wiki\/Merge_sort#Variants\" target=\"_blank\"><u>this<\/u><\/a>.<\/p><br><p>Merge Sort is also a <a href=\"?slide=17-2\"><u>stable sort<\/u><\/a> algorithm. Discussion: Why?<\/p>", "title": "Pros and Cons" }, { "id": 775, "category": "sorting", "order": 11, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 1, "created_at": "2022-01-04 14:22:28", "updated_at": "2023-08-21 09:48:33", "section": 179, "code": "", "section_order": 11, "value": "11-11", "text": "<pre>B[bIdx++] = (A[left] &lt;= A[right]) ? A[left++] : A[right++];<br><\/pre><p>In the merge routine, we have the code as above. If the front of the left subarray (let&#39;s call it &#39;X&#39;) is equals to the front of the right subarray (let&#39;s call it &#39;Y&#39;), the Merge routine will pick &#39;X&#39; first, thus preserving stability. Note that one character change below (notice &lt; vs &lt;=) makes Merge Sort no longer stable.<\/p><pre>B[bIdx++] = (A[left] &lt; A[right]) ? A[left++] : A[right++];<br><\/pre>", "title": "The Answer" }, { "id": 180, "category": "sorting", "order": 12, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-03-26 19:23:20", "updated_at": "2023-08-21 09:33:14", "section": -1, "code": "$('#title-Quick').click();\nchangeSortType(gw.quickSort, \"27,38,12,39,27,16\");", "section_order": -1, "value": "12", "text": "<p>Quick Sort is another Divide and Conquer sorting algorithm (the other one discussed in this visualization page is <a href=\"?slide=11\"><u>Merge Sort<\/u><\/a>).<\/p><br><p>We will see that this deterministic, non randomized version of Quick Sort can have bad time complexity of O(<b>N<\/b><sup>2<\/sup>) on adversary input before continuing with the <a href=\"?slide=13\"><u>randomized<\/u><\/a> and usable version later.<\/p>", "title": "Quick Sort" }, { "id": 556, "category": "sorting", "order": 1, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 07:16:06", "updated_at": "2023-08-21 09:50:46", "section": 180, "code": "$('#title-Quick').click();\nchangeSortType(gw.quickSort, \"27,38,12,39,27,16\");", "section_order": 12, "value": "12-1", "text": "<p>Divide step: Choose an item <b>p<\/b> (known as the pivot)<br>Then partition the items of <b>A[i..j]<\/b> into three parts: <b>A[i..m-1]<\/b>, <b>A[m]<\/b>, and <b>A[m+1..j]<\/b>.<br><b>A[i..m-1]<\/b> (possibly empty) contains items that are smaller than (or equal to) <b>p<\/b>.<br><b>A[m] = p<\/b>, i.e., index <b>m<\/b> is the correct position for <b>p<\/b> in the sorted order of array <b>a<\/b>.<br><b>A[m+1..j]<\/b> (possibly empty) contains items that are greater than (or equal to) <b>p<\/b>.<br>Then, recursively sort the two parts.<\/p><br><p>Conquer step: Don&#39;t be surprised... We do nothing :O!<\/p><br><p>If you compare this with <a href=\"?slide=11-4\"><u>Merge Sort<\/u><\/a>, you will see that Quick Sort D&amp;C steps are totally opposite with Merge Sort.<\/p>", "title": "Quick Sort as a D&amp;C Algorithm" }, { "id": 574, "category": "sorting", "order": 2, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-02 05:19:13", "updated_at": "2023-08-21 09:51:19", "section": 180, "code": "$('#title-Quick').click();\nchangeSortType(gw.quickSort, \"27,38,12,39,27,16\");", "section_order": 12, "value": "12-2", "text": "<p>We will dissect this Quick Sort algorithm by first discussing its most important sub-routine: The O(<b>N<\/b>) <samp>partition<\/samp> (classic version).<\/p><br><p>To partition <b>A[i..j]<\/b>, we first choose <b>A[i]<\/b> as the pivot <b>p<\/b>.<br><\/p><p>The remaining items (i.e., <b>A[i+1..j]<\/b>) are divided into 3 regions:<\/p><ol><li><b>S1<\/b> = <b>A[i+1..m]<\/b> where items are &le; <b>p<\/b>,<\/li><li><b>S2<\/b> = <b>A[m+1..k-1]<\/b> where items are &ge; <b>p<\/b>, and<\/li><li>Unknown = <b>A[k..j]<\/b>, where items are yet to be assigned to either <b>S1<\/b> or <b>S2<\/b>.<\/li><\/ol><p>Discussion: Why do we choose <b>p<\/b> = <b>A[i]<\/b>? Are there other choices?<\/p><br><p>Harder Discussion: If <b>A[k] == p<\/b>, should we put it in region S1 or S2?<\/p>", "title": "Important Sub-routine, O(N) Partition" }, { "id": 583, "category": "sorting", "order": 3, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 1, "created_at": "2017-06-06 03:49:51", "updated_at": "2023-08-21 09:51:35", "section": 180, "code": "$('#title-Quick').click();\nchangeSortType(gw.quickSort, \"27,38,12,39,27,16\");", "section_order": 12, "value": "12-3", "text": "<p>The choice of <b>p<\/b> = <b>A[i]<\/b> is arbitrary. Any item between <b>A[i..j]<\/b> can be chosen as a pivot.<\/p><br><p>However we will <a href=\"?slide=12-12\"><u>later see<\/u><\/a> that fixing the pivot in deterministic manner can lead to poor time complexity of O(<b>N<\/b><sup>2<\/sup>) so we will later <a href=\"?slide=13\"><u>randomize it<\/u><\/a>.<\/p><br><p>Regarding duplicate items, is it actually <b>not<\/b> good to always put item(s) that is\/are == <b>p<\/b> either region S1 (or S2) at all times as it will make even the Randomized version of Quick Sort runs in O(<b>N<sup>2<\/sup><\/b>). A better implementation is to randomly put item(s) that is\/are == <b>p<\/b> on either S1 or S2, using 50-50 chance (there is another way to do this).<\/p>", "title": "The Answer" }, { "id": 575, "category": "sorting", "order": 4, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-02 05:24:25", "updated_at": "2023-08-21 09:52:20", "section": 180, "code": "$('#title-Quick').click();\nchangeSortType(gw.quickSort, \"27,38,12,39,27,16\");", "section_order": 12, "value": "12-4", "text": "<p>Initially, both <b>S1<\/b> and <b>S2<\/b> regions are empty, i.e., all items excluding the designated pivot <b>p<\/b> are in the unknown region.<\/p><br><p>Then, for each item <b>A[k]<\/b> in the unknown region, we compare <b>A[k]<\/b> with <b>p<\/b> and decide one of the three cases:<\/p><ol><li>If <b>A[k]<\/b> &gt; <b>p<\/b>, put <b>A[k]<\/b> into <b>S2<\/b>,<\/li><li>If <b>A[k]<\/b> &lt; <b>p<\/b>, put <b>A[k]<\/b> into <b>S1<\/b>,<\/li><li>If <b>A[k]<\/b> == <b>p<\/b>, throw a coin and put <b>A[k]<\/b> into <b>S1<\/b>\/<b>S2<\/b> if it lands head\/tail, respectively.<\/ol><p>These three cases are elaborated in the next two slides.<\/p><br><p>Lastly, we swap <b>A[i]<\/b> and <b>A[m]<\/b> to put pivot <b>p<\/b> right in the middle of <b>S1<\/b> and <b>S2<\/b>.<\/p>", "title": "Partition - Continued" }, { "id": 576, "category": "sorting", "order": 5, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-02 05:25:02", "updated_at": "2023-08-21 09:52:52", "section": 180, "code": "$('#title-Quick').click();\nchangeSortType(gw.quickSort, \"27,38,12,39,27,16\");", "section_order": 12, "value": "12-5", "text": "<img src=\"https:\/\/visualgo.net\/img\/partition1.png\" width=\"500\" alt=\"Case when a[k] &ge; p, increment k, extend S2 by 1 item\">", "title": "Partition - Case when A[k] &gt; p" }, { "id": 577, "category": "sorting", "order": 6, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-02 05:26:05", "updated_at": "2023-08-21 09:52:55", "section": 180, "code": "$('#title-Quick').click();\nchangeSortType(gw.quickSort, \"27,38,12,39,27,16\");", "section_order": 12, "value": "12-6", "text": "<img src=\"https:\/\/visualgo.net\/img\/partition2.png\" width=\"500\" alt=\"Case when a[k] &lt; p, increment m, swap a[k] with a[m], increment k, extend S1 by 1 item\">", "title": "Partition - Case when A[k] &lt; p" }, { "id": 579, "category": "sorting", "order": 7, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-02 05:44:26", "updated_at": "2023-08-21 09:50:13", "section": 180, "code": "$('#title-Quick').click();\nchangeSortType(gw.quickSort, \"27,38,12,39,27,16\");", "section_order": 12, "value": "12-7", "text": "<pre>int partition(array A, integer i, integer j)<br>  int p = a[i] \/\/ p is the pivot<br>  int m = i \/\/ S1 and S2 are initially empty<br>  for (int k = i+1; k &lt;= j; ++k) \/\/ explore the unknown region<br>    if ((A[k] &lt; p) || ((A[k] == p) && (rand()%2 == 0)))  { \/\/ case 2+3<br>      ++m<br>      swap(A[k], A[m]) \/\/ exchange these two indices<br>    \/\/ notice that we do nothing in case 1: A[k] &gt; p<br>  swap(A[i], A[m]) \/\/ final step, swap pivot with a[m]<br>  return m \/\/ return the index of pivot<\/pre>", "title": "Partition Pseudocode Implementation" }, { "id": 578, "category": "sorting", "order": 8, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-02 05:43:05", "updated_at": "2023-08-21 09:54:23", "section": 180, "code": "$('#title-Quick').click();\nchangeSortType(gw.quickSort, \"27,38,12,39,27,16\");", "section_order": 12, "value": "12-8", "text": "<pre>method quickSort(array A, integer low, integer high)<br>  if (low &lt; high)<br>    int m = partition(a, low, high) \/\/ O(N)<br>    \/\/ A[low..high] ~&gt; A[low..m\u20131], pivot, A[m+1..high]<br>    quickSort(A, low, m-1); \/\/ recursively sort left subarray<br>    \/\/ A[m] = pivot is already sorted after partition<br>    quickSort(A, m+1, high); \/\/ then sort right subarray<\/pre><p>See the code shown in <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SortingDemo.cpp\" target=\"_blank\"><u>SortingDemo.cpp<\/u><\/a> | <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SortingDemo.py\" target=\"_blank\"><u>py<\/u><\/a> | <a href=\"https:\/\/www.comp.nus.edu.sg\/~stevenha\/cs2040\/demos\/SortingDemo.java\" target=\"_blank\"><u>java<\/u><\/a>.<\/p>", "title": "Quick Sort Pseudocode Implementation" }, { "id": 557, "category": "sorting", "order": 9, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 07:16:20", "updated_at": "2023-08-21 09:55:55", "section": 180, "code": "$('#title-Quick').click();\nchangeSortType(gw.quickSort, \"27,38,12,39,29,16\");", "section_order": 12, "value": "12-9", "text": "<p>Try <span class=\"slide-actions\" onclick=\"doButtonAction13()\">Quick Sort<\/span> on example array [27, 38, 12, 39, 29, 16]. We shall elaborate the first partition step as follows:<br>We set <b>p = A[0] = 27<\/b>.<br>We set <b>A[1] = 38<\/b> as part of <b>S2<\/b> so <b>S1 = {}<\/b> and <b>S2 = {38}<\/b>.<br>We swap <b>A[1] = 38<\/b> with <b>A[2] = 12<\/b> so <b>S1 = {12}<\/b> and <b>S2 = {38}<\/b>.<br>We set <b>A[3] = 39<\/b> and later <b>A[4] = 29<\/b> as part of <b>S2<\/b> so <b>S1 = {12}<\/b> and <b>S2 = {38,39,29}<\/b>.<br>We swap <b>A[2] = 38<\/b> with <b>A[5] = 16<\/b> so <b>S1 = {12,16}<\/b> and <b>S2 = {39,29,38}<\/b>.<br>We swap <b>p = A[0] = 27<\/b> with <b>A[2] = 16<\/b> so <b>S1 = {16,12}<\/b>, <b>p = {27}<\/b>, and <b>S2 = {39,29,38}<\/b>.<\/p><br><p>After this, <b>A[2] = 27<\/b> is guaranteed to be sorted and now Quick Sort recursively sorts the left side <b>A[0..1]<\/b> first and later recursively sorts the right side <b>A[3..5]<\/b>.<\/p>", "title": "Demonstration" }, { "id": 558, "category": "sorting", "order": 10, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 07:16:37", "updated_at": "2023-08-21 09:56:26", "section": 180, "code": "$('#title-Quick').click();", "section_order": 12, "value": "12-10", "text": "<p>First, we analyze the cost of one call of <samp>partition<\/samp>.<\/p><br><p>Inside <samp>partition(A, i, j)<\/samp>, there is only a single for-loop that iterates through (j-i) times. As j can be as big as <b>N<\/b>-1 and i can be as low as 0, then the time complexity of partition is O(<b>N<\/b>).<\/p><br><p>Similar to <a href=\"?slide=11-7\"><u>Merge Sort analysis<\/u><\/a>, the time complexity of Quick Sort is then dependent on the number of times <samp>partition(A, i, j)<\/samp> is called.<\/p>", "title": "Quick Sort: Analysis Part 1" }, { "id": 559, "category": "sorting", "order": 11, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 07:16:53", "updated_at": "2023-08-21 09:56:51", "section": 180, "code": "$('#title-Quick').click();\nchangeSortType(gw.quickSort, \"5,18,23,39,44,50\");", "section_order": 12, "value": "12-11", "text": "<p>When the array <b>A<\/b> is already in ascending order, e.g., <b>A<\/b> = [5, 18, 23, 39, 44, 50], <span class=\"slide-actions\" onclick=\"doButtonAction13()\">Quick Sort<\/span> will set <b>p = A[0] = 5<\/b>, and will return <b>m = 0<\/b>, thereby making <b>S1<\/b> region <b>empty<\/b> and <b>S2<\/b> region: Everything else other than the pivot (<b>N<\/b>-1 items).<\/p>", "title": "Quick Sort: Analysis Part 2" }, { "id": 580, "category": "sorting", "order": 12, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-05 03:35:23", "updated_at": "2023-09-18 10:36:22", "section": 180, "code": "$('#title-Quick').click();\nchangeSortType(gw.quickSort, \"5,18,23,39,44,50\");", "section_order": 12, "value": "12-12", "text": "<p>On such worst case input scenario, this is what happens:<\/p><br><img src=\"\/img\/qsort_worstcase.png\" width=\"250\" alt=\"Worst Case analysis of Quick Sort\"><br><p>The first partition takes O(<b>N<\/b>) time, splits <b>A<\/b> into 0, 1, <b>N<\/b>-1 items, then recurse right.<br>The second one takes O(<b>N<\/b>-1) time, splits <b>A<\/b> into 0, 1, <b>N<\/b>-2 items, then recurse right again.<br>...<br>Until the last, <b>N<\/b>-th partition splits <b>A<\/b> into 0, 1, 1 item, and Quick Sort recursion stops.<br><\/p><br><p>This is the classic <b>N+(N-1)+(N-2)+...+1<\/b> pattern, which is O(<b>N<\/b><sup>2<\/sup>), similar analysis as the one <a href=\"?slide=7-1\"><u>in this Bubble Sort analysis slide<\/u><\/a>...<\/p>", "title": "Quick Sort: Analysis Part 3" }, { "id": 582, "category": "sorting", "order": 13, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-05 03:51:20", "updated_at": "2023-08-21 09:54:39", "section": 180, "code": "$('#title-Quick').click();\nchangeSortType(gw.quickSort, \"4,1,3,2,6,5,7\");", "section_order": 12, "value": "12-13", "text": "<p>The best case scenario of Quick Sort occurs when partition always splits the array into <b>two equal halves<\/b>, like <a href=\"?slide=11-8\"><u>Merge Sort<\/u><\/a>.<\/p><br><p>When that happens, the depth of recursion is only O(log <b>N<\/b>).<\/p><br><p>As each level takes O(<b>N<\/b>) comparisons, the time complexity is O(<b>N<\/b> log <b>N<\/b>).<\/p><br><p>Try <span class=\"slide-actions\" onclick=\"doButtonAction13()\">Quick Sort<\/span> on this hand-crafted example input array [4, 1, 3, 2, 6, 5, 7].<br>In practice, this is rare, thus we need to devise a better way: <a href=\"?slide=13\"><u>Randomized Quick Sort<\/u><\/a>.<\/p>", "title": "Quick Sort: Best Case (Rare)" }, { "id": 181, "category": "sorting", "order": 13, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-03-26 19:37:45", "updated_at": "2023-08-21 09:57:58", "section": -1, "code": "$('#title-RandomizedQuick').click();\nchangeSortType(gw.randomizedQuickSort, DEFAULT_DATA);", "section_order": -1, "value": "13", "text": "<p>Same as <b>Quick Sort<\/b> except just before executing the partition algorithm, it <b>randomly<\/b> select the pivot between <b>A[i..j]<\/b> instead of always choosing <b>A[i]<\/b> (or any other fixed index between <b>[i..j]<\/b>) deterministically.<\/p><br><p>Mini exercise: Implement the idea above to the implementation shown in <a href=\"?slide=12-7\"><u>this slide<\/u><\/a>!<\/p><br><p>Running <span class=\"slide-actions\" onclick=\"doButtonAction14()\">Random Quick Sort<\/span> on this large and somewhat random example array <b>a<\/b> = [3,44,38,5,47,15,36,26,27,2,46,4,19,50,48] feels fast.<\/p>", "title": "Random Quick Sort" }, { "id": 569, "category": "sorting", "order": 1, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-02 05:07:14", "updated_at": "2023-08-21 09:58:34", "section": 181, "code": "", "section_order": 13, "value": "13-1", "text": "<p>It will take about 1 hour lecture to properly explain why this randomized version of Quick Sort has expected time complexity of O(<b>N<\/b> log <b>N<\/b>) on <b>any<\/b> input array of <b>N<\/b> elements.<\/p><br><p>In this e-Lecture, we will assume that it is true.<\/p><br><p>If you need non formal explanation: Just imagine that on randomized version of Quick Sort that randomizes the pivot selection, we will <b>not<\/b> always get extremely bad split of 0 (empty), 1 (pivot), and <b>N<\/b>-1 other items. This combination of lucky (half-pivot-half), somewhat lucky, somewhat unlucky, and extremely unlucky (empty, pivot, the rest) yields an average time complexity of O(<b>N<\/b> log <b>N<\/b>).<\/p><br><p>Discussion: For the implementation of <a href=\"?slide=12-4\"><u>Partition<\/u><\/a>, what happen if <b>A[k] == p<\/b>, we <i>always<\/i> put <b>A[k]<\/b> on either side (<b>S1<\/b> or <b>S2<\/b>) deterministically?<\/p>", "title": "Magical Analysis" }, { "id": 776, "category": "sorting", "order": 2, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 1, "created_at": "2022-01-04 15:28:57", "updated_at": "2023-08-21 09:54:49", "section": 181, "code": "", "section_order": 13, "value": "13-2", "text": "<p>If that is the case, the Random Quick Sort degenerates to O(<b>N<\/b><sup>2<\/sup>) again.<\/p>", "title": "The Answer" }, { "id": 560, "category": "sorting", "order": 14, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 07:17:28", "updated_at": "2023-08-21 09:54:54", "section": -1, "code": "$('#title-Counting').click();", "section_order": -1, "value": "14", "text": "<p>We will discuss two <b>non comparison-based<\/b> sorting algorithms in the next few slides:<\/p><ol><li><a href=\"?slide=15\"><u>Counting Sort<\/u><\/a>,<\/li><li><a href=\"?slide=16\"><u>Radix Sort<\/u><\/a>.<\/li><\/ol><p>These sorting algorithms can be faster than the lower bound of comparison-based sorting algorithm of &Omega;(<b>N<\/b> log <b>N<\/b>) by <b>not<\/b> comparing the items of the array.<\/p>", "title": "2 O(N) Non Comparison-based Sorting Algorithms" }, { "id": 561, "category": "sorting", "order": 1, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 07:17:53", "updated_at": "2023-08-21 09:54:56", "section": 560, "code": "$('#title-Counting').click();", "section_order": 14, "value": "14-1", "text": "<p>It is known (also not proven in this visualization as it will take about half-an-hour lecture about decision tree model to do so) that all <b>comparison-based<\/b> sorting algorithms have a lower bound time complexity of \u03a9(<b>N<\/b> log <b>N<\/b>).<\/p><br><p>Thus, any comparison-based sorting algorithm with worst-case complexity O(<b>N<\/b> log <b>N<\/b>), like <a href=\"?slide=11-9\"><u>Merge Sort<\/u><\/a> is considered an optimal algorithm, i.e., we cannot do better than that.<\/p><br><p>However, we can achieve faster sorting algorithm \u2014 i.e., in O(<b>N<\/b>) \u2014 if certain assumptions of the input array exist and thus we can avoid comparing the items to determine the sorted order.<\/p>", "title": "Lower Bound of Sorting Algorithm" }, { "id": 182, "category": "sorting", "order": 15, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-03-26 19:43:21", "updated_at": "2023-08-21 09:55:00", "section": -1, "code": "$('#title-Counting').click();", "section_order": -1, "value": "15", "text": "<p><b>Assumption<\/b>: If the items to be sorted are <b>Integers with small range<\/b>, we can count the frequency of occurrence of each Integer (in that small range) and then loop through that small range to output the items in sorted order.<\/p><br><p>Try <span class=\"slide-actions\" onclick=\"doButtonAction15()\">Counting Sort<\/span> on the example array above where all Integers are within [1..9], thus we just need to count how many times Integer 1 appears, Integer 2 appears, ..., Integer 9 appears, and then loop through 1 to 9 to print out <b>x<\/b> copies of Integer <b>y<\/b> if frequency[<b>y<\/b>] = <b>x<\/b>.<\/p><br><p>The time complexity is O(<b>N<\/b>) to count the frequencies and O(<b>N+k<\/b>) to print out the output in sorted order where <b>k<\/b> is the range of the input Integers, which is 9-1+1 = 9 in this example. The time complexity of Counting Sort is thus O(<b>N+k<\/b>), which is O(<b>N<\/b>) if <b>k<\/b> is small.<\/p><br><p>We will not be able to do the counting part of Counting Sort when <b>k<\/b> is relatively big due to memory limitation, as we need to store frequencies of those <b>k<\/b> integers.<\/p><br><p>PS: This version of Counting Sort is not stable, as it does not actually remember the (input) ordering of duplicate integers. The version presented in CLRS is stable, but is a bit more complex than this form.<\/p>", "title": "Counting Sort" }, { "id": 183, "category": "sorting", "order": 16, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-03-26 20:11:59", "updated_at": "2023-08-21 09:55:04", "section": -1, "code": "$('#title-Radix').click();", "section_order": -1, "value": "16", "text": "<p><b>Assumption<\/b>: If the items to be sorted are <b>Integers with large range but of few digits<\/b>, we can combine <a href=\"?slide=15\"><u>Counting Sort<\/u><\/a> idea with Radix Sort to achieve the linear time complexity.<\/p><br><p>In Radix Sort, we treat each item to be sorted as a string of <b>w<\/b> digits (we pad Integers that have less than <b>w<\/b> digits with leading zeroes if necessary).<\/p><br><p>For the least significant (rightmost) digit to the most significant digit (leftmost), we pass through the <b>N<\/b> items and put them according to the active digit into 10 Queues (one for each digit [0..9]), which is like a <i>modified<\/i> Counting Sort as this one preserves <a href=\"?slide=17-2\"><u>stability<\/u><\/a> (remember, the Counting Sort version shown in <a href=\"?slide=15\"><u>this slide earlier<\/u><\/a> is not a stable sort). Then we re-concatenate the groups again for subsequent iteration.<\/p><br><p>Try <span class=\"slide-actions\" onclick=\"doButtonAction16()\">Radix Sort<\/span> on the random 4-digits array above for clearer explanation.<\/p><br><p>Notice that we only perform O(<b>w &times; (N+k)<\/b>) iterations. In this example, <b>w = 4<\/b> and <b>k = 10<\/b>.<\/p>", "title": "Radix Sort" }, { "id": 638, "category": "sorting", "order": 1, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-08-30 16:47:08", "updated_at": "2023-08-21 09:55:09", "section": 183, "code": "$('#title-Radix').click();", "section_order": 16, "value": "16-1", "text": "<p>Now, having discussed about Radix Sort, should we use it for <b>every<\/b> sorting situation?<\/p><br><p>For example, it should be theoretically faster to sort many (<b>N<\/b> is very large) 32-bit signed integers as <b>w &le; 10<\/b> digits and <b>k = 10<\/b> if we interpret those 32-bit signed integers in Decimal. O(10 &times; (<b>N<\/b>+10)) = O(<b>N<\/b>).<\/p><br><p>Discussion: Using base-10 as shown in this visualization is actually not the best way to sort <b>N<\/b> 32-bit signed integers. What should be the better setup?<\/p>", "title": "The Best Sorting Algorithm for Integers?" }, { "id": 770, "category": "sorting", "order": 2, "top": "320px", "right": "", "bottom": "", "left": "50%", "marginLeft": "-250px", "width": "500px", "showActionsPanel": 1, "showStatusPanel": 0, "showCodetracePanel": 1, "created_at": "2021-12-26 14:38:53", "updated_at": "2023-08-21 09:55:11", "section": 183, "code": "$('#title-Radix').click();", "section_order": 16, "value": "16-2", "text": "<p>The answer is: It depends.<\/p><br><p>If the number of digits of all Integers are small, similar, and there are lots of Integers, Radix Sort can be better than O(<b>N<\/b> log <b>N<\/b>) comparison-based sorting algorithms.<\/p><br><p>However, for cases like sorting <b>A<\/b> = [732834702348928349382734, 1] in ascending order, then any comparison-based sorting algorithm will easily sort <b>A<\/b> while Radix Sort will do more work.<\/p><br><p>Sometimes, we do not sort integers, e.g. sort floating point numbers. In that case, we need to use the more general purpose comparison-based sorting algorithms.<\/p>", "title": "The Answer" }, { "id": 570, "category": "sorting", "order": 17, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-02 05:08:53", "updated_at": "2023-08-21 09:59:02", "section": -1, "code": "", "section_order": -1, "value": "17", "text": "<p>There are a few other properties that can be used to differentiate sorting algorithms on top of whether they are comparison or non-comparison, recursive or iterative.<\/p><br><p>In this section, we will talk about in-place versus not in-place, stable versus not stable, and caching performance of sorting algorithms.<\/p>", "title": "Additional Properties of Sorting Algorithms" }, { "id": 571, "category": "sorting", "order": 1, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-02 05:09:15", "updated_at": "2023-08-21 09:59:44", "section": 570, "code": "", "section_order": 17, "value": "17-1", "text": "<p>A sorting algorithm is said to be an <b>in-place sorting<\/b> algorithm if it requires only a constant amount (i.e., O(<b>1<\/b>)) of extra space during the sorting process. That&#39;s it, a few, constant number of extra variables is OK but we are not allowed to have variables that has variable length depending on the input size <b>N<\/b>.<\/p><br><p><a href=\"?slide=11-2\"><u>Merge Sort<\/u><\/a> (the classic version), due to its <samp>merge<\/samp> sub-routine that requires additional temporary array of size <b>N<\/b>, is not in-place.<\/p><br><p>Discussion: How about Bubble Sort, Selection Sort, Insertion Sort, Quick Sort (randomized or not), Counting Sort, and Radix Sort. Which ones are in-place?<\/p>", "title": "In-Place Sorting" }, { "id": 572, "category": "sorting", "order": 2, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-02 05:09:24", "updated_at": "2023-08-21 09:59:06", "section": 570, "code": "", "section_order": 17, "value": "17-2", "text": "<p>A sorting algorithm is called <b>stable<\/b> if the relative order of elements <b>with the same key value<\/b> is preserved by the algorithm after sorting is performed.<\/p><br><p>Example application of stable sort: Assume that we have student names that have been sorted in alphabetical order. Now, if this danh sách đã được sắp xếp xong again by tutorial group number (recall that one tutorial group usually has many students), a stable sort algorithm would ensure that all students in the same tutorial group still appear in alphabetical order of their names. <a href=\"?slide=16\"><u>Radix sort<\/u><\/a> that goes through multiple round of sorts digit-by-digit requires a stable sort sub-routine for it to work correctly.<\/p><br><p>Discussion: Which of the sorting algorithms discussed in this e-Lecture are stable?<br>Try sorting array A = {3, 4a, 2, 4b, 1}, i.e. there are two copies of 4 (4a first, then 4b).<\/p>", "title": "Stable Sort" }, { "id": 573, "category": "sorting", "order": 3, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 1, "created_at": "2017-06-02 05:09:32", "updated_at": "2023-08-21 09:59:08", "section": 570, "code": "", "section_order": 17, "value": "17-3", "text": "<p>This topic is more relevant if one already understand the concept of how computer manages cache memory. This is one of the topic in another typical Computer Science module: \"Computer Organization\".<\/p><br><p>Basically, the behavior of partition algorithm of Quick Sort is very cache friendly and thus Quick Sort, especially the randomized version, is the typical sorting algorithm used in most sorting libraries, like in C++ STL sort (combined with others).<\/p><br><p>Follow up question: How about other sorting algorithms?<\/p>", "title": "Caching Performance" }, { "id": 164, "category": "sorting", "order": 18, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-03-20 04:29:58", "updated_at": "2023-08-21 09:59:11", "section": -1, "code": "", "section_order": -1, "value": "18", "text": "<p>We are nearing the end of this e-Lecture.<\/p><br><p>Time for a few simple questions.<\/p>", "title": "Quizzes" }, { "id": 184, "category": "sorting", "order": 1, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-03-26 20:23:35", "updated_at": "2023-08-21 09:59:14", "section": 164, "code": "", "section_order": 18, "value": "18-1", "text": "<input class=\"mcq-answer\" id=\"mcq-answer-1\" value=\"5\" hidden><p>Quiz: <b>Which of these algorithms run in O(N log N) on any input array of size N?<\/b><\/p><form><input type=\"radio\" name=\"mcq-1-choice\" value=\"4\"> Quick Sort (Deterministic)<br><input type=\"radio\" name=\"mcq-1-choice\" value=\"2\"> Bubble Sort<br><input type=\"radio\" name=\"mcq-1-choice\" value=\"3\"> Insertion Sort<br><input type=\"radio\" name=\"mcq-1-choice\" value=\"5\"> Merge Sort<br><\/form><button class=\"mcq-submit\" id=\"submit-1\">Submit<\/button> <span id=\"answer-status-1\"><\/span>", "title": "Quiz #1" }, { "id": 185, "category": "sorting", "order": 2, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-03-26 20:23:54", "updated_at": "2023-08-21 09:59:17", "section": 164, "code": "", "section_order": 18, "value": "18-2", "text": "<input class=\"msq-answer\" id=\"msq-answer-3\" value=\"13,15,16\" hidden><p>Quiz: <b>Which of these algorithms has worst case time complexity of \u0398(N^2) for sorting N integers?<\/b><\/p><input type=\"checkbox\" class=\"msq-choice\" id=\"msq-3-choice-13\"> Bubble Sort<br><input type=\"checkbox\" class=\"msq-choice\" id=\"msq-3-choice-16\"> Selection Sort<br><input type=\"checkbox\" class=\"msq-choice\" id=\"msq-3-choice-14\"> Merge Sort<br><input type=\"checkbox\" class=\"msq-choice\" id=\"msq-3-choice-23\"> Radix Sort<br><input type=\"checkbox\" class=\"msq-choice\" id=\"msq-3-choice-15\"> Insertion Sort<br><button class=\"msq-submit\" id=\"submit-3\">Submit<\/button> <span id=\"answer-status-3\"><\/span><br><br><p>\u0398 is a tight time complexity analysis where the best case &Omega; and the worst case big-O analysis match.<\/p>", "title": "Quiz #2" }, { "id": 562, "category": "sorting", "order": 19, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 07:18:30", "updated_at": "2023-08-21 09:59:18", "section": -1, "code": "", "section_order": -1, "value": "19", "text": "<p>We have reached the end of sorting e-Lecture.<\/p><br><p>However, there are two other sorting algorithms in VisuAlgo that are embedded in other data structures: <a href=\".\/heap\"><u>Heap Sort<\/u><\/a> and <a href=\".\/bst\"><u>Balanced BST Sort<\/u><\/a>. We will discuss them when you go through the e-Lecture of those two data structures.<\/p>", "title": "Extras" }, { "id": 568, "category": "sorting", "order": 1, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 1, "created_at": "2017-06-01 09:00:35", "updated_at": "2023-08-21 09:59:21", "section": 562, "code": "", "section_order": 19, "value": "19-1", "text": "<p>The secret challenge is about comparing various sorting algorithms discussed here using various input types (sorted\/nearly sorted ascending\/descending; or random input).<\/p><br><p>In NUS CS2040\/C, this will be delegated to at-home exercise and discussed during tutorial session.<\/p>", "title": "Challenge" }, { "id": 677, "category": "sorting", "order": 2, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 1, "created_at": "2018-02-01 12:53:10", "updated_at": "2023-08-21 09:59:24", "section": 562, "code": "", "section_order": 19, "value": "19-2", "text": "<p>Inversion Index\/Count of an array <b>A<\/b> indicates how far\/close <b>A<\/b> is from being sorted.<\/p><br><p>If array <b>A<\/b> is already sorted, then the inversion index is 0.<br>If array <b>A<\/b> is sorted in reverse order, then inversion index is the maximum = <b>N*(N-1)\/2<\/b>.<\/p><br><p>Two elements <b>A[i]<\/b> and <b>A[j]<\/b> form an inversion if <b>A[i] &gt; A[j]<\/b> and <b>i &lt; j<\/b>.<\/p><br><p>We can compute Inversion Index of an array <b>A<\/b> in O(<b>N<\/b><sup>2<\/sup>) by simulating Bubble Sort swaps, or in O(<b>N<\/b> log <b>N<\/b>) by counting the Inversion during the <samp>merge<\/samp> part of Merge Sort.<\/p>", "title": "Inversion Index\/Count" }, { "id": 563, "category": "sorting", "order": 3, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 07:18:40", "updated_at": "2023-08-21 09:59:26", "section": 562, "code": "", "section_order": 19, "value": "19-3", "text": "<p>Actually, the C++ source code for many of these basic sorting algorithms are already scattered throughout these e-Lecture slides. For other programming languages, you can translate the given C++ source code to the other programming language.<\/p><br><p>Usually, sorting is just a small part in problem solving process and nowadays, most of programming languages have their own sorting functions so we don&#39;t really have to re-code them <i>unless absolutely necessary<\/i>.<\/p><br><p>In C++, you can use <a href=\"http:\/\/en.cppreference.com\/w\/cpp\/algorithm\/sort\" target=\"_blank\"><u>std::sort<\/u><\/a> (most likely a hybrid sorting algorithm: Introsort), <a href=\"http:\/\/en.cppreference.com\/w\/cpp\/algorithm\/stable_sort\" target=\"_blank\"><u>std::stable_sort<\/u><\/a> (most likely Merge Sort), or <a href=\"http:\/\/en.cppreference.com\/w\/cpp\/algorithm\/partial_sort\" target=\"_blank\"><u>std::partial_sort<\/u><\/a> (most likely Binary Heap) in STL algorithm.<br>In Python, you can use&nbsp;<a href=\"https:\/\/docs.python.org\/3\/library\/stdtypes.html#list.sort\" target=\"_blank\"><u>sort<\/u><\/a>&nbsp;(most likely a hybrid sorting algorithm: Timsort).<br>In Java, you can use <a href=\"https:\/\/docs.oracle.com\/javase\/9\/docs\/api\/java\/util\/Collections.html#sort-java.util.List-\" target=\"_blank\"><u>Collections.sort<\/u><\/a>.<br>In OCaml, you can use <a href=\"https:\/\/caml.inria.fr\/pub\/docs\/manual-ocaml\/libref\/List.html\" target=\"_blank\"><u>List.sort compare list_name<\/u><\/a>.<br><\/p><br><p>If the comparison function is problem-specific, we may need to supply additional comparison function to those built-in sorting routines.<\/p>", "title": "Implementation" }, { "id": 564, "category": "sorting", "order": 4, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 07:18:56", "updated_at": "2023-08-21 09:59:29", "section": 562, "code": "", "section_order": 19, "value": "19-4", "text": "<p>Now it is time for you to see if you have understand the basics of various sorting algorithms discussed so far.<\/p><br><p><span class=\"slide-actions\" onclick=\"doButtonAction17()\">Test your understanding here!<\/span><\/p>", "title": "Online Quiz" }, { "id": 565, "category": "sorting", "order": 5, "top": "70px", "right": "", "bottom": "", "left": "60px", "marginLeft": "", "width": "500px", "showActionsPanel": 0, "showStatusPanel": 0, "showCodetracePanel": 0, "created_at": "2017-06-01 07:19:17", "updated_at": "2023-08-21 09:59:31", "section": 562, "code": "", "section_order": 19, "value": "19-5", "text": "<p>Now that you have reached the end of this e-Lecture, do you think sorting problem is just as simple as calling built-in sort routine?<\/p><br><p>Try these online judge problems to find out more:<br><a href=\"https:\/\/open.kattis.com\/problems\/mjehuric\" target=\"_blank\"><u>Kattis - mjehuric<\/u><\/a><br><a href=\"https:\/\/open.kattis.com\/problems\/sortofsorting\" target=\"_blank\"><u>Kattis - sortofsorting<\/u><\/a>, or<br><a href=\"https:\/\/open.kattis.com\/problems\/sidewayssorting\" target=\"_blank\"><u>Kattis - sidewayssorting<\/u><\/a><\/p><br><p>This is not the end of the topic of sorting. When you explore other topics in VisuAlgo, you will realise that sorting is a pre-processing step for many other advanced algorithms for harder problems, e.g. as the pre-processing step for <a href=\".\/mst\"><u>Kruskal&#39;s algorithm<\/u><\/a>, creatively used in <a href=\".\/suffixarray\"><u>Suffix Array<\/u><\/a> data structure, etc.<\/p>", "title": "Online Judge Exercises" }];
    const numSlides = lectureIds.length;
    var sectorJunction12Section = 0, sectorJunction12Slide = 0;
    var sectorJunction23Section = 0, sectorJunction23Slide = 0;
    var sector1Count = 0, sector2Count = 0, sector3Count = 0;
    const sectorLength = Math.floor(numSlides / 3);
    function createELectureTimelineDisplay() {
      for (let j = 0; j < numSlides; ++j) {
        const currLecture = lectureIds[j].value;
        if (currLecture.includes('-')) {
          $('#e-lecture-timeline').append(
            $(`<div class="e-lecture-timeline-slide" slideNo=${lectureIds[j].value}></div>`)
          );
        } else {
          $('#e-lecture-timeline').append(
            $(`<div class="e-lecture-timeline-checkpoint" slideNo=${lectureIds[j].value}></div>`)
          );
        }
      }
    }

    function setSectorJunctionInfo() {
      //setting the sector junction slide numbers
      const j12 = sectorLength !== 0 ? (sectorLength - 1) : 0;
      const j23 = sectorLength !== 0 ? (2 * sectorLength - 1) : 0;

      const sectorJunction12 = lectureIds[j12].value.split('-');
      sectorJunction12Section = parseInt(sectorJunction12[0]);
      sectorJunction12Slide = sectorJunction12.length > 1 ? parseInt(sectorJunction12[1]) : sectorJunction12Slide;

      const sectorJunction23 = lectureIds[j23].value.split('-');
      sectorJunction23Section = parseInt(sectorJunction23[0]);
      sectorJunction23Slide = sectorJunction23.length > 1 ? parseInt(sectorJunction23[1]) : sectorJunction23Slide;
    }



    window.onpopstate = function (event) {
      var slide = event.state['slide'];
      openSlide(slide, function () {
        runSlide(slide);
      });
    };

    function getUrlParameter(sParam) {
      var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'), sParameterName, i;

      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    };
    var slideTimeline = {};

    //reads all visited slides in the slideTimeline and gives them their sector color
    function setVisitedSlideTimelineColors() {
      for (const [sectionNo, visitedSlides] of Object.entries(slideTimeline)) {
        const visitedSlides = slideTimeline[sectionNo];
        for (const visitedSlideNo of visitedSlides) {
          setSlideTimelineColor(visitedSlideNo);
        }
      }
    }

    //only called on load if there is nothing in session
    function setTimelineForCompletedSector(sectorNum) {
      let len = sectorLength;
      switch (sectorNum) {
        case 1: len = sectorLength; break;
        case 2: len = 2 * sectorLength; break;
        default: len = numSlides;
      }
      let i = 0;
      switch (sectorNum) {
        case 1: i = 0; break;
        case 2: i = sectorLength; break;
        default: i = 2 * sectorLength;
      }
      for (; i < len; i++) {
        saveELectureTimeline(lectureIds[i].value, true);
      }
    }

    function getUserSectorHistory(callback) {
      $.ajax({
        type: 'GET',
        url: "https://visualgo.net/section-info",
        data: {
          _token: "KgXJw47QezINxp9yEq4hedkV0uokoUnQh6zoA1pw",
          topic: "/sorting".substring(1)
        }
      }
      ).done(function (data) {
        if (data.data[0] === 1) {
          setF1SectorColor(1);
          setTimelineForCompletedSector(1);
        }
        if (data.data[1] === 1) {
          setF1SectorColor(2);
          setTimelineForCompletedSector(2);
        }
        if (data.data[2] === 1) {
          setF1SectorColor(3);
          setTimelineForCompletedSector(3);
        }
        callback();
      }).fail(function (data) {
        console.log('get user sector history failed!');
      });
    }

    function getELectureTimelineFromSession() {
      const page = "/sorting".substring(1);
      const timelineKey = page + '-slide-timeline';
      const storedTimeline = window.sessionStorage.getItem(timelineKey);
      if (storedTimeline) {
        slideTimeline = JSON.parse(storedTimeline);
      } else {
        return false;
      }
      let slideInfo = [];
      for (const [sectionNum, slides] of Object.entries(slideTimeline)) {
        for (const slide of slides) {
          indicateSlideCompletedUI(slide);
          slideInfo = slide.split('-');
          incrementSectorVisits(parseInt(sectionNum), slideInfo.length > 1 ? parseInt(slideInfo[1]) : 0);
        }
      }
      return true;
    }

    async function initializeELectureTimeline() {
      setSectorJunctionInfo();
      if (!getELectureTimelineFromSession())
        getUserSectorHistory(sectorBasedModeSelection);
      else
        sectorBasedModeSelection();

      createELectureTimelineDisplay();
      setVisitedSlideTimelineColors();
    }

    function setF1SectorColor(sectorNum) {
      $(`[sectorNo="${sectorNum}"]`).css('background', sectorColors[(parseInt(sectorNum) % 3)]);
    }

    function updateSectorInDB(sectorNum) {
      $.ajax({
        type: 'POST',
        url: "https://visualgo.net/section-info",
        data: {
          _token: "KgXJw47QezINxp9yEq4hedkV0uokoUnQh6zoA1pw",
          section: (sectorNum - 1),
          topic: "/sorting".substring(1)
        }
      }
      ).done(function (data) {
        //console.log("Saved the sector " + sectorNum + " as done " + JSON.stringify(data));
      }).fail(function (data) {
        console.log("Setting sector done failed new attempt! " + JSON.stringify(data));
      });
    }

    //If 87.5% or more of the slides in sector are done
    function setF1SectorCompleted(sectorNum, isInitializationCall) {
      setF1SectorColor(sectorNum);
      //avoid api call on initialization
      if (!isInitializationCall) {
        updateSectorInDB(sectorNum);
        $(`[sectorNo="${sectorNum}"]`).css("animation", "green-pulse 2s 4");
        setTimeout(() => {
          $(`[sectorNo="${sectorNum}"]`).css("animation", "");
        }, 8000);
      }
    }

    function incrementSectorVisits(sectionNum, slideNumWithinSection, isInitializationCall) {
      //updating sector count
      if (sectionNum < sectorJunction12Section
        || (sectionNum === sectorJunction12Section && slideNumWithinSection <= sectorJunction12Slide)) {
        ++sector1Count;
        if (sector1Count >= Math.ceil(0.875 * sectorLength))
          setF1SectorCompleted(1, isInitializationCall);
      } else if (sectionNum < sectorJunction23Section
        || (sectionNum === sectorJunction23Section && slideNumWithinSection <= sectorJunction23Slide)) {
        ++sector2Count;
        if (sector2Count >= Math.ceil(0.875 * sectorLength))
          setF1SectorCompleted(2, isInitializationCall);
      } else {
        ++sector3Count;
        if (sector3Count >= Math.ceil(0.875 * (numSlides - 2 * sectorLength)))
          setF1SectorCompleted(3, isInitializationCall);
      }
    }

    function saveELectureTimeline(slideNo, isInitialization) {
      const slideInfo = slideNo.split('-');
      const sectionNo = slideInfo[0];
      const slideNumWithinSection = slideInfo.length > 1 ? parseInt(slideInfo[1]) : 0;
      if (slideTimeline[sectionNo]) {
        if (!slideTimeline[sectionNo].includes(slideNo)) {
          slideTimeline[sectionNo].push(slideNo);
          const sectionNum = parseInt(sectionNo);
          incrementSectorVisits(sectionNum, slideNumWithinSection, isInitialization);
        }
      } else {
        slideTimeline[sectionNo] = [];
        slideTimeline[sectionNo].push(slideNo);
        const sectionNum = parseInt(sectionNo);
        incrementSectorVisits(sectionNum, slideNumWithinSection, isInitialization);
      }
      setSlideTimelineColor(slideNo);
      indicateSlideCompletedUI(slideNo);
    }

    function saveELectureTimelineToSession() {
      const page = "/sorting".substring(1);
      const timelineKey = page + '-slide-timeline';
      window.sessionStorage.setItem(timelineKey, JSON.stringify(slideTimeline));
    }

    function handleTimelineOnRunSlide(slideValue) {
      const slideInfo = slideValue.split('-');
      const sectionNo = slideInfo[0];
      const slideNumWithinSection = slideInfo.length > 1 ? parseInt(slideInfo[1]) : 0;
      //start timer only if the slide isnt already done
      if (!slideTimeline[sectionNo] || !slideTimeline[sectionNo].includes(slideValue)) {
        const slideTextLength = $('#electure-' + slideValue + " p").text().length + $('#electure-' + slideValue + " li").text().length;
        const CHARS_READ_PER_MS = 0.05; //when fast, 50 characters a second
        //setting max reading time as 10 seconds for around 500 character slide
        const minSlideReadingTime = Math.min(Math.max(2000, (slideTextLength / CHARS_READ_PER_MS) + + (2000 * $('#electure-' + slideValue + " img").length)), 10000);
        currSlideTimer = setTimeout(() => {
          saveELectureTimeline(slideValue);
        }, minSlideReadingTime);
      }
    }

    function indicateSlideCompletedUI(slide) {
      $('#electure-' + slide).css("box-shadow", "3px 3px 8px green"); //set green shadow for completed slides
      $('#electure-' + slide + ' .electure-read-status').html("&#10004;");
      $('#electure-' + slide + ' .electure-read-status').attr("title", "Slide Completed!");
      $('#electure-' + slide + ' .electure-read-status').css("font-size", "17px");
    }

    function pushState(slideValue) {
      var url = '/en/sorting';
      if (typeof slideValue != 'undefined' && slideValue != null) {
        url += '?slide=' + slideValue;
      }
      window.history.pushState({ slide: slideValue }, "slide " + slideValue, url);
    }

    function showPopup(callback) {
      $('#popup').fadeIn(100, callback);
    }

    function hidePopup(callback) {
      $('#popup').fadeOut(100, callback);
    }

    function showOverlay() {
      $('#overlay').css('opacity', 0.5);
      $('#overlay').show();

      $("#e-lecture-timeline").show();
      $("#e-lecture-f1map").show();
    }

    function hideOverlay() {
      $('#overlay').hide();
      $("#e-lecture").html("");
      $("#e-lecture-timeline").hide();
      $("#e-lecture-f1map").hide();
      clearTimeout(currSlideTimer);
    }

    function makeOverlayTransparent() {
      $('#overlay').css('opacity', 0);
    }

    
    function sectorBasedModeSelection() {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      //check params are empty and then that all sectors are completed or not
      if (!Object.keys(params).length
        && sector1Count === sectorLength && sector2Count === sectorLength && sector3Count === (numSlides - 2 * sectorLength)) {
        hideOverlay();
      }
      else
        $('#mode-menu a').click();
    }

    $(function () {
      if (isMobileOS() && portraitMatcher.matches) {
        $('#rotateDeviceOverlay').show();
        $('#rotateDeviceText').show();
        $('#widenDeviceText').hide();
        $('#topbar').css("z-index", 10001);
      } else if (matchMediaNarrow.matches) {
        $('#rotateDeviceOverlay').show();
        $('#rotateDeviceText').hide();
        $('#widenDeviceText').show();
        $('#topbar').css("z-index", 10001);
      } else {
        $('#rotateDeviceOverlay').hide();
        $('#topbar').css("z-index", "");
      }

      matchMediaNarrow.addEventListener('change', e => {
        //screws up for square device! NEED RESIZE EVENT
        if (e.matches) {
          if ($('#rotateDeviceOverlay').is(":hidden")) {
            $('#rotateDeviceOverlay').show();
            $('#rotateDeviceText').hide();
            $('#widenDeviceText').show();
            $('#topbar').css("z-index", 10001);
          }
        } else {
          $('#rotateDeviceOverlay').hide();
          $('#topbar').css("z-index", "");
        }
      });
      portraitMatcher.addEventListener('change', e => {
        if (e.matches && isMobileOS()) {
          if ($('#rotateDeviceOverlay').is(":hidden")) {
            $('#rotateDeviceOverlay').show();
            $('#rotateDeviceText').show();
            $('#widenDeviceText').hide();
            $('#topbar').css("z-index", 10001);
          }
        } else {
          $('#rotateDeviceOverlay').hide();
          $('#topbar').css("z-index", "");
        }
      });
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      let slide = getUrlParameter('slide');
      if (typeof slide !== undefined && slide != null) {
        cur_slide = slide;
      }
      //do all timeline and slide stuff only if specific params not provided
      if (!Object.keys(params).length || params["slide"]) {
        if (!isMobile()) {
          $('#mode-menu a').click();
        }
      }
      $('.mcq-submit').click(function () {
        var questionId = parseInt($(this).attr('id').split('-')[1]);
        var answer = $('#mcq-answer-' + questionId).val();
        var userAnswer = $('input[type=radio][name=mcq-' + questionId + '-choice]:checked').val();

        if (answer === userAnswer) {
          $('#answer-status-' + questionId).html('<font color="green"><b>Correct!</b></font>');
        }
        else {
          $('#answer-status-' + questionId).html('<font color="red"><b>Wrong Answer! Try again...</b></font>');
        }
        $('#answer-status-' + questionId).show();
        setTimeout(function () {
          $('#answer-status-' + questionId).fadeOut(1000);
        }, 1000);
      });

      $('.msq-submit').click(function () {
        var questionId = parseInt($(this).attr('id').split('-')[1]);
        var answer = $('#msq-answer-' + questionId).val();

        var answers = [];
        $('input[type=checkbox][class=msq-choice]:checked').each(function () {
          answers.push($(this).attr('id').split('-')[3]);
        });
        answers.sort();
        var userAnswer = answers.join(',');

        if (answer === userAnswer) {
          $('#answer-status-' + questionId).html('<font color="green">Correct!</font>');
        }
        else {
          $('#answer-status-' + questionId).html('<font color="red">Wrong Answer! Try again...</font>');
        }
        $('#answer-status-' + questionId).show();
        setTimeout(function () {
          $('#answer-status-' + questionId).fadeOut(1000);
        }, 1000);
      });

      $('select.lecture-dropdown').change(function () {
        var nextSlide = $(this).val();
        openSlide(nextSlide, function () {
          runSlide(nextSlide);
          pushState(nextSlide);
        });
      });

      $('#hide-popup').click(function () {
        hidePopup();
      });

      $('#popup').hover(function () {
        $('#hide-popup').show();
      }, function () {
        $('#hide-popup').hide();
      });

    });



    $('.electure-print').click(() => {
      window.open(`/en/sorting/print`);
    });
    function adjustPopupToImageSize() {
      var width = $('#popup-image').prop('width');
      var height = $('#popup-image').prop('height');
      $('#popup').width(width + 20);
      $('#popup').height(height + 20);
      if (width == 0 && height == 0) {
        setTimeout(adjustPopupToImageSize, 200);
      } else {
        showPopup();
      }
    }

    function POPUP_IMAGE(url) {
      $('#popup-content').html('<img id="popup-image" src="' + url + '">');
      adjustPopupToImageSize();
    }

    function URL(url) {
      window.open(url, '_blank');
    }

    // Implement these functions in each visualisation
    // This function will be called before entering e-Lecture Mode
    function ENTER_LECTURE_MODE() { }

    // This function will be called before returning to Explore Mode
    function ENTER_EXPLORE_MODE() { }

    // Lecture action functions
    function CUSTOM_ACTION(action, data, mode) { }

    // This function will be called everytime 1.0x is changed to 0.5x or vice versa
    function redraw() { }

    $(document).ready(function () {
      setTimeout(function () {
        $('#change-lang-popup').fadeOut('slow')
      }, 5000)
    })
  