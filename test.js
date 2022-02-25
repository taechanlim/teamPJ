let page = 21
    let view_article = 10;


    let total_record = 200; // rows 
    let total_pages = Math.ceil(total_record/view_article) // total_pages 20
    let block_article = 10; // 10
    let blocks = Math.ceil(total_pages/block_article) // 2 [1]~[10] [11]~[20]
    // 2번 블록 보고싶다 이러면 
    // [11]~[20]
    // 3번 블록 
    // [21]~[30]
    // 1번 
    // [1]~[10]
    // 
    let current_block = Math.ceil(page/block_article) // 내가 21번의 페이지를 보고있으면 몇번쨰 블럭 인지 알고싶다.
    
    // page 2
    let pages = []
    for(let i=1; i<=view_article;i++){
        pages.push((current_block-1)*view_article+(i))
    }

    console.log(pages)