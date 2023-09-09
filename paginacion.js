const loadMoreBtn = document.querySelector(".section--blog-entries__btn");
let page = 1;
loadMoreBtn.addEventListener("click", () => {
    page++;

    fetch(`http://localhost:3000/blog.html?page=${page}`)
    .then((res) => res.text())
    .then ((res_html) => {
        const parser = new DOMParser();

    })
})

if (CustomElementRegistry.lenght == 0) {
    loadMoreBtn
}
