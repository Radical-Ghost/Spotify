let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs = [
	{
		name: "2 Dumb Kids",
		filePath: "Songs/2 Dumb Kids.mp3",
		coverPath: "icons/2 Dumb Kids.jpg",
	},
	{
		name: "All About You",
		filePath: "Songs/All About You.mp3",
		coverPath: "icons/All About You.jpg",
	},
	{
		name: "Apollo",
		filePath: "Songs/Apollo.mp3",
		coverPath: "icons/Apollo.jpg",
	},
	{
		name: "BANG!",
		filePath: "Songs/BANG!.mp3",
		coverPath: "icons/BANG!.jpg",
	},
	{
		name: "CASTLE",
		filePath: "Songs/CASTLE.mp3",
		coverPath: "icons/CASTLE.jpg",
	},
	{
		name: "Calm Down",
		filePath: "Songs/Calm Down.mp3",
		coverPath: "icons/Calm Down.jpg",
	},
	{
		name: "Change My Clothes",
		filePath: "Songs/Change My Clothes.mp3",
		coverPath: "icons/Change My Clothes.jpg",
	},
	{
		name: "If We Have Each Other",
		filePath: "Songs/If We Have Each Other.mp3",
		coverPath: "icons/If We Have Each Other.jpg",
	},
	{
		name: "Mind is a Prison",
		filePath: "Songs/Mind is a Prison.mp3",
		coverPath: "icons/Mind is a Prison.jpg",
	},
	{
		name: "No Friends",
		filePath: "Songs/No Friends.mp3",
		coverPath: "icons/No Friends.jpg",
	},
	{
		name: "Overwhelmed",
		filePath: "Songs/Overwhelmed.mp3",
		coverPath: "icons/Overwhelmed.jpg",
	},
	{
		name: "Rise Up",
		filePath: "Songs/Rise Up.mp3",
		coverPath: "icons/Rise Up.jpg",
	},
	{
		name: "Takeaway",
		filePath: "Songs/Takeaway.mp3",
		coverPath: "icons/Takeaway.jpg",
	},
	{
		name: "The Book of You and I",
		filePath: "Songs/The Book of You and I.mp3",
		coverPath: "icons/The Book of You and I.jpg",
	},
];
let songIndex = 0;
let audioElement = new Audio(songs[songIndex].filePath);

masterPlay.addEventListener("click", () => {
	if (audioElement.paused || audioElement.currentTime <= 0) {
		audioElement.play();
		masterPlay.classList.remove("fa-play");
		masterPlay.classList.add("fa-pause");
		songItem = songItems.find(
			(item) =>
				item.querySelector(".name").textContent === songs[songIndex].name
		);
		makeAllPlays();
		songItem.querySelector(".plays").classList.remove("fa-play");
		songItem.querySelector(".plays").classList.add("fa-pause");
	} else {
		audioElement.pause();
		makeAllPlays();
		masterPlay.classList.remove("fa-pause");
		masterPlay.classList.add("fa-play");
	}
});

audioElement.addEventListener("timeupdate", () => {
	progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
	progressBar.value = progress;
});

progressBar.addEventListener("change", () => {
	audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
	Array.from(document.getElementsByClassName("plays")).forEach((element) => {
		element.classList.remove("fa-pause");
		element.classList.add("fa-play");
	});
};

Array.from(document.getElementsByClassName("plays")).forEach((element) => {
	element.addEventListener("click", (e) => {
		const nameSpan = e.target.closest(".songItem").querySelector(".name");
		const songName = nameSpan.textContent;
		for (songIndex in songs) if (songs[songIndex].name === songName) break;
		audioElement.src = `Songs/${songName}.mp3`;
		audioElement.currentTime = 0;
		if (e.target.classList.contains("fa-play")) {
			audioElement.play();
			makeAllPlays();
			e.target.classList.remove("fa-play");
			e.target.classList.add("fa-pause");
			masterPlay.classList.remove("fa-play");
			masterPlay.classList.add("fa-pause");
		} else if (e.target.classList.contains("fa-pause")) {
			console.log("Pause button clicked");
			e.target.classList.remove("fa-pause");
			e.target.classList.add("fa-play");
			audioElement.pause();
		}
		banner(songName);
	});
});

const banner = (songName) => {
	document.getElementById("bannerimg").src = `icons/${songName}.jpg`;
	document.getElementById("bannertxt").innerText = songName;
};

forward.addEventListener("click", () => {
	songIndex++;
	if (songIndex >= songs.length) {
		songIndex = 0;
	}
	audioElement.src = songs[songIndex].filePath;
	audioElement.play();
	masterPlay.classList.remove("fa-play");
	masterPlay.classList.add("fa-pause");
	songItem = songItems.find(
		(item) => item.querySelector(".name").textContent === songs[songIndex].name
	);
	makeAllPlays();
	songItem.querySelector(".plays").classList.remove("fa-play");
	songItem.querySelector(".plays").classList.add("fa-pause");
	banner(songs[songIndex].name);
});

backward.addEventListener("click", () => {
	songIndex--;
	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}
	audioElement.src = songs[songIndex].filePath;
	audioElement.play();
	masterPlay.classList.remove("fa-play");
	masterPlay.classList.add("fa-pause");
	songItem = songItems.find(
		(item) => item.querySelector(".name").textContent === songs[songIndex].name
	);
	makeAllPlays();
	songItem.querySelector(".plays").classList.remove("fa-play");
	songItem.querySelector(".plays").classList.add("fa-pause");
	banner(songs[songIndex].name);
});
