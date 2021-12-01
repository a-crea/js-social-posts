// post a cui l'utente ha già messo like
let userLikes = [2, 3, 6];
const posts = [
  {
    id: 1,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/300?image=171",
    author: {
      name: "Phil Mangione",
      image: "https://unsplash.it/300/300?image=15",
    },
    likes: 80,
    created: "2021-06-25",
    tags: ["landscape", "rain", "lights"],
  },
  {
    id: 2,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=112",
    author: {
      name: "Sofia Perlari",
      image: "https://unsplash.it/300/300?image=10",
    },
    likes: 120,
    created: "2021-09-03",
    tags: ["landscape", "summer", "sun"],
  },
  {
    id: 3,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=234",
    author: {
      name: "Chiara Passaro",
      image: "https://unsplash.it/300/300?image=20",
    },
    likes: 78,
    created: "2021-05-15",
    tags: [],
  },
  {
    id: 4,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=24",
    author: {
      name: "Luca Formicola",
      image: null,
    },
    likes: 56,
    created: "2021-04-03",
    tags: ["macro", "book", "study"],
  },
  {
    id: 5,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=534",
    author: {
      name: "Alessandro Sainato",
      image: "https://unsplash.it/300/300?image=29",
    },
    likes: 95,
    created: "2021-03-05",
    tags: ["work", "book", "productivity"],
  },
];

// Prendiamo il contenitore dei post
// e per ogni elemento di posts creiamo un nuovo post e lo appendiamo al container
const postsContainer = document.getElementById("posts-container");
posts.forEach((postObject) => {
  const postHTML = getPostHTML(postObject);

  postsContainer.innerHTML += postHTML;
});

initializeLikeButtonClickListener();

// -------------
// FUNCTIONS
// -------------

// Genera l'html del singolo post da un oggetto che rappresenta il post stesso
//
// singlePostObject -> oggetto, che contiene tutte le informazioni sul singolo post
//
// return: stringa (create col template literal). La stringa rappresenta l'html del singolo post
//         pronto per essere stampato in pagina
function getPostHTML(singlePostObject) {
  const { id, content, media, likes, author, created, tags } = singlePostObject;

  const singlePostTemplate = `
  <div class="post">
    <div class="post-header">
        <div class="author-image">
            <div class="author-image-circle">
                ${
                  author.image
                    ? getAuthorImageTag(author)
                    : getAuthorInitials(author.name)
                }
            </div>
        </div>

        <div class="post-info">
            <div class="author-name">${author.name}</div>
            <div class="post-created">${getItalianDate(created)}</div>
        </div>
    </div>

    <div class="post-content">
        <p>
            ${content}
        </p>
    </div>

    <div class="post-media">
        <img src="${media}" alt="">
    </div>

    ${tags.length > 0 ? getContainerWithPostTags(tags) : ""}

    <div class="post-like">
        <a href="#" class="like-button js_like_button ${
          userLikes.includes(id) ? "clicked" : ""
        }"
        data-postid="${id}"
        >
            <i class="fas fa-thumbs-up"></i>
            Mi piace
        </a>

        <div class="likes-counter">
            Piace a <span id="like-counter-post-${id}" class="likes-counter-number">${likes}</span> persone
        </div>
    </div>
  </div>
  `;

  return singlePostTemplate;
}

// Traduce una data in italiano partendo da un formato di data inglese
// englishDate -> una stringa contenente una data in formato inglese
//
// return: una stringa contenente la data tradotta in formato italiano
function getItalianDate(englishDate) {
  const dateArray = englishDate.split("-");
  const [year, month, day] = dateArray;
  return `${day}/${month}/${year}`;
}

// Crea il tag img dell'autore pronto per essere stampato
// authorObject -> oggetto che contiene le informazioni sull'autore
//
// return: stringa contenente il tag img pronto per essere stampato
function getAuthorImageTag(authorObject) {
  return `<img src="${authorObject.image}" alt="${authorObject.name}">`;
}

// Torna una stringa con le iniziali del nome maiuscole
// authorName-> Stringa che contiene il nome dell'autore
//
// return: stringa che contiene le iniziali di ogni parola del nome in maiuscolo
function getAuthorInitials(authorName) {
  const nameArray = authorName.split(" ");
  let initialsString = "";
  nameArray.forEach((nameWord) => {
    initialsString += nameWord[0].toUpperCase();
  });

  return initialsString;
}

// Riceve un array di stringhe (tags)
// Per ogni elemento dell'array:
// - costruisce l'elemento HTML del tag (span)
// return: stringa HTML con tutti i tag

// function getPostTag(tagValue) {
//   return `<span class="single-tag">
//   #${tagValue}
// </span>`;
// }

function getContainerWithPostTags(tagsArray) {
  let tags = "";
  tagsArray.forEach((element) => {
    tags += `<span class="single-tag">
    #${element}
  </span>`;
  });
  return `<div class="post-tags">
      ${tags}
    </div>`;
}

function initializeLikeButtonClickListener() {
  const likeButtons = document.getElementsByClassName("js_like_button");
  for (let i = 0; i < likeButtons.length; i++) {
    const element = likeButtons[i];
    element.addEventListener("click", handleLikeClick);
  }
}

function handleLikeClick() {
  // aggiungere la classe clicked al button
  this.classList.toggle("clicked");
  // incrementare il numero di like del post
  // selezionare lo span contenente il numero di like
  const postId = parseInt(this.getAttribute("data-postid"));
  if (userLikes.includes(postId)) {
    //decrementiamo
    userLikes = userLikes.filter((element) => element !== postId);
    addRemoveLikeToPost(postId, false);
  } else {
    //incrementiamo e pushamo
    userLikes.push(postId);
    addRemoveLikeToPost(postId, true);
  }
}

function addRemoveLikeToPost(postId, isPlusOne) {
  const likeCounterSpan = document.getElementById(
    `like-counter-post-${postId}`
  );
  const numberOfLikes = parseInt(likeCounterSpan.innerHTML);
  if (isPlusOne) {
    likeCounterSpan.innerHTML = numberOfLikes + 1;
  } else {
    likeCounterSpan.innerHTML = numberOfLikes - 1;
  }
}
