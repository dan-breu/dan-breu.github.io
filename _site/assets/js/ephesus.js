function toggleNightMode(){
	const logo = document.getElementById('site-logo');
	const html = document.documentElement;
	const modeSwitcher = document.getElementById('mode-switcher');
	const currentTheme = html.getAttribute('data-theme');
	
	if(currentTheme === 'light') {
		html.setAttribute('data-theme', 'dark');
		modeSwitcher.classList.add('active');
		localStorage.setItem("theme", "dark");
		logo.src = "assets/images/logo-dark.png";
	} else {
		html.setAttribute('data-theme', 'light');
		modeSwitcher.classList.remove('active');
		localStorage.setItem("theme", "light");
		logo.src = "assets/images/logo-light.png";
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const savedTheme = localStorage.getItem("theme") || "light";
	const html = document.documentElement;
	const logo = document.getElementById('site-logo');
	const modeSwitcher = document.getElementById('mode-switcher');
	
	html.setAttribute('data-theme', savedTheme);
	
	if(savedTheme === "dark"){
		modeSwitcher.classList.add('active');
		logo.src = "assets/images/logo-dark.png";
	} else {
		modeSwitcher.classList.remove('active');
		logo.src = "assets/images/logo-light.png";
	}
});
