// variables that connect the code with the "id" on the html
// manipulating the variables and will then manipulate the html
var img = document.createElement("img");
var text = document.getElementById("text"); 
var buttonBox = document.getElementById("buttonBox");
var input = document.getElementById("input");
var avatar1_input = document.getElementById("avatar1_input");
var avatar_name = "undefined";
var story_text = "";
var avatar2_true = 0;
var points = 0;

// after avater_name is entered and advance with "Enter"
// add avatar_name as variable, remove the input box and start first scenario
function ClearFields() {
	document.getElementById("input").value = "";
}

input.onkeypress = function(event) {
	console.log(input.value);
	if (event.key == "Enter" || event.keyCode == 13) {
		avatar_name = input.value;
	}
};

avatar2.onkeypress = function(event) {
	if (event.key == "Enter" || event.keyCode == 13) {
		avatar2.parentNode.removeChild(avatar2);
		return avatar2_true = 1;
	}
};

// button to start game
start_game.onclick = function(event) {
	if (avatar2_true == 1) {
		start_game.parentNode.removeChild(start_game);
		imgintro.parentNode.removeChild(imgintro);
		document.getElementById('score').innerHTML = points;
		advanceTo0pts(scenario.Step1);
	} else {
		alert("You have not yet selected your name.");
	}
};

// button to re-start game
restart_game = function() {
	let text = "Are you sure? This will reset the game and all progress is lost.";
	if (confirm(text) == true) {
		location.reload();
		points = 0;
	} else {
		points = points;
	}
	document.getElementById('score').innerHTML = points;
};

// changes the story text
var changeText = function(words) {
	text.innerHTML = words.replace("", story_text);
};

// takes the image link and puts it in the proper format, sending it to the html
var changeImage = function(imgsrc) {
	img.src = imgsrc;
	img.style = "width:100%; max-width:inherited; height:auto; max-height:inherited;";
	var div = document.getElementById("images");
	div.appendChild(img);
	div.style = "height:auto;"
};

// the number of options set creating enough buttons 
var changeButtons = function(buttonList) {
	buttonBox.innerHTML = "";
	for (var i = 0; i < buttonList.length; i++) {
		buttonBox.innerHTML += "<button onClick="+buttonList[i][1]+">" + buttonList[i][0] + "</button>";
	};
};

//moves the game along
var advanceTo10pts = function(s) {
	changeImage(s.image)
	changeText(s.text)
	changeButtons(s.buttons)
	// add 10 points for correct answers
	points = points + 10;
	document.getElementById('score').innerHTML = points;
};

var advanceTo20pts = function(s) {
	changeImage(s.image)
	changeText(s.text)
	changeButtons(s.buttons)
	// add 20 points for correct answers and extra effort
	points = points + 20;
	document.getElementById('score').innerHTML = points;
};

var advanceToMinus10pts = function(s) {
	changeImage(s.image)
	changeText(s.text)
	changeButtons(s.buttons)
	// add 10 points for correct answers
	points = points - 10;
	document.getElementById('score').innerHTML = points;
};

var advanceToReset = function(s) {
	changeImage(s.image)
	changeText(s.text)
	changeButtons(s.buttons)
	points = 0;
	// reset to zero points for start of game
	document.getElementById('score').innerHTML = points;
};

var advanceTo0pts = function(s) {
	changeImage(s.image)
	changeText(s.text)
	changeButtons(s.buttons)
	// add zero points
	document.getElementById('score').innerHTML = points;
};

// popup modal for bad answers
var badAnswer = function(s) {
	changeImage(s.image)
	changeText(s.text)
	changeButtons(s.buttons)
	var modal = document.getElementById("myModal");
	modal.style.display = "block";
	// when the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}
	// when the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
	// subtract 10 points for wrong answers
	points = points - 10;
	document.getElementById('score').innerHTML = points;
}

// get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// this is a onclick function for the created modal which is necessary to have the close button work
myModal.onclick = function() {
	modal.style.display = "block";
}

// the object that holds each scenario, the more you add the more options there are
var scenario = {
	// introduction to the language camp info
	Step1: {
		image: "Fig01.png",
		text: "Your teacher is telling you about an immerse language course in Germany. It offers a program where you can learn by having fun, meet people from other countries, and help as a volunteer.",
		buttons: [["Continue", "advanceTo0pts(scenario.Step_1a_Decision)"]],
	},
	Step_1a_Decision:{
		image: "Fig02.jpg",
		text: "The language school offers several courses. Which language course would you like to take?",
		buttons: [["German", "advanceTo10pts(scenario.Step2)"],["French", "advanceTo10pts(scenario.Step2)"],["None", "advanceToReset(scenario.End_of_Game)"]]
	},
	Step2: {
		image: "Fig03.png",
		text: "The language course is expensive but there are some scholarships available. You will need to do a language exam to be eligible. What do you want to do?",
		buttons: [["You apply for the scholarships available.", "advanceTo20pts(scenario.Step3a)"],["You get a job in the store nearby, but you might not be traveling with your classmates.", "advanceTo10pts(scenario.Step3b)"],
		["Not to go to the course","advanceToReset(scenario.End_of_Game)"]]
	},
	Step3a: {
		image: "Fig03a.png",
		text: "You studied hard and you got the scholarship. Congratulations!",
		buttons: [["Continue", "advanceTo0pts(scenario.Map)"]]
	},
	Step3b: {
		image: "Fig03b.png",
		text: "You have to save enough money during summer, but most of your classmates are going to the language camp that very summer. What do you do?",
		buttons: [["Talk to your classmates and agree with them to wait until autumn or spring", "advanceTo10pts(scenario.Map)"],["To go by your own next autumn or spring", "advanceTo20pts(scenario.Map)"],["Not to go without your classmates","advanceTo10pts(scenario.End_of_Game)"]]
	},
	Map: {
		image: "GermanyMap.jpg",
		text: "You have arrived at the school site located in the centre of the municipality of Masserberg. The area is beautiful and surrounded by forest; it looks like you will have a great time!",
		buttons: [["Continue", "advanceTo0pts(scenario.Step4)"]]
	},
	Step4: {
		image: "Fig04.png",
		text: "At the school, the administrator has allocated you in a bed that you don’t like. What do you do?",
		buttons: [["To ask your roommates if someone wants a bed interchange", "advanceTo10pts(scenario.Step5)"],["To push one of your roommates to move to your bed instead","advanceToMinus10pts(scenario.Step5)"]]
	},
	Step5: {
		image: "Fig05.png",
		text: "Next morning, you find out that you have been allocated to a different class than your roommates. You are in a class with people that come from France, Romania, and Spain. You feel unsure and hesitate to enter the class. What do you do next?",
		buttons: [["To enter the room and try to meet new people", "advanceTo10pts(scenario.Step5a)"],["You don&#39;t enter the room,and ask the administrator to move you with your new friends","advanceToMinus10pts(scenario.Step5a)"]]
	},
	Step5a: {
		image: "Fig05aEssay.jpg",
		text: "You’ve been a couple of days in the school. Your language course is getting intense and your teacher advice to write a short essay about your hometown. It is not compulsory, but it can give you extra points at the end of the course. What do you do?",
		buttons: [["You don’t write the essay", "advanceToMinus10pts(scenario.Step5c)"],["You write the essay", "advanceTo10pts(scenario.Step5b)"]]
	},
	Step5b: {
		image: "Fig05bEssay.png",
		text: "You have decided to write an essay. Your teacher informs you that it is really good and that it will be published in the school webpage. Congratulations!",
		buttons: [["Continue", "advanceTo10pts(scenario.StepQuiz1)"]]
	},
	Step5c: {
		image: "Fig05cNoEssay.png",
		text: "You have decided not to write an essay. You haven’t lost points…but didn’t earn any either.",
		buttons: [["Continue", "advanceTo0pts(scenario.StepQuiz1)"]]
	},
	// language quiz
	StepQuiz1: {
		image: "Quiz.png",
		text: "A surprise quiz for some bonus points?",
		buttons: [["Yes, take me there", "advanceTo0pts(scenario.Q1Language)"],["No, thanks","advanceTo0pts(scenario.Step6)"]]
	},
	Q1Language: {
		image: "LanguageQ1.jpg",
		text: "Which language is the most commonly used in the world?",
		buttons: [["English", "badAnswer(scenario.Q1LanAnswer)"],["Chinese", "advanceTo10pts(scenario.Q1LanAnswer)"],["Spanish", "badAnswer(scenario.Q1LanAnswer)"]]
	},
	Q1LanAnswer: {
		image: "LanguageQ1Answer.jpg",
		text: "The correct answer is &ldquo;Chinese&rdquo;. There are 1.31 billion speakers of Chinese. The second most spoken language is Spanish, and the third is English",
		buttons: [["Continue", "advanceTo0pts(scenario.Q2Language)"]]
	},
	Q2Language: {
		image: "LanguageQ2.jpg",
		text: "Is it true or false that being bilingual helps your brain keep healthy and fit?",
		buttons: [["True", "advanceTo10pts(scenario.Q2LanAnswer)"],["False","badAnswer(scenario.Q2LanAnswer)"]]
	},
	Q2LanAnswer: {
		image: "LanguageQ2Answer.jpg",
		text: "The correct answer is &ldquo;True&rdquo;. Being bilingual or multilingual has been shown to have social, psychological and lifestyle advantages.",
		buttons: [["Continue","advanceTo0pts(scenario.Q3Language)"]]
	},
	Q3Language: {
		image: "LanguageQ3.jpg",
		text: "Which language is older?",
		buttons: [["English", "badAnswer(scenario.Q3LanAnswer)"],["French","badAnswer(scenario.Q3LanAnswer)"],["Romanian","advanceTo10pts(scenario.Q3LanAnswer)"]]
	},
	Q3LanAnswer: {
		image: "LanguageQ3Answer.jpg",
		text: "The correct answer is &ldquo;Romanian&rdquo;. The Romanian language is 1,700 years old. English and French have developed over the course of 1,400 years, approximately.",
		buttons: [["Continue","advanceTo0pts(scenario.Q4Language)"]]
	},
	Q4Language: {
		image: "LanguageQ4.jpg",
		text: "Is Romanian more similar to French than to English?",
		buttons: [["Yes", "advanceTo10pts(scenario.Q4LanAnswer)"],["No","badAnswer(scenario.Q4LanAnswer)"]]
	},
	Q4LanAnswer: {
		image: "LanguageQ4Answer.png",
		text: "The correct answer is &ldquo;Yes&rdquo;. Both Romanian and French are Romance languages (meaning that they are descended primarily from Vulgar Latin). English descends from Germanic languages.",
		buttons: [["Continue","advanceTo0pts(scenario.Q5Language)"]]
	},
	Q5Language: {
		image: "LanguageQ5.png",
		text: "Are the words in the image language's names?",
		buttons: [["Yes", "advanceTo10pts(scenario.Q5LanAnswer)"],["No","badAnswer(scenario.Q5LanAnswer)"]]
	},
	Q5LanAnswer: {
		image: "LanguageQ5Answer.jpg",
		text: "The correct answer is &ldquo;Yes&rdquo;. These are the names of three programing languages",
		buttons: [["Continue","advanceTo0pts(scenario.Step6)"]]
	},
	Step6: {
		image: "Fig06.png",
		text: "You have chosen a leisure activity (football, yoga, tennis, or swimming). However, you didn’t like the first session. What do you do?",
		buttons: [["Talk to the instructor and explain why you are unhappy", "advanceTo10pts(scenario.Step6a)"],["Complain with your classmates about how bad the activity is","advanceToMinus10pts(scenario.Step6a)"]]
	},
	Step6a: {
		image: "Fig06aBalanceLife.jpg",
		text: "Your leisure activity has become amazing, and you are feeling great. However, you have spent little time doing your assignments and you need to earn more points for the final certificate. What do you do?",
		buttons: [["You spend some time doing your assignments and deliver them to the teacher", "advanceTo10pts(scenario.Step6bExtraPoints)"],["You don’t care about points, you continue dedicating long time in your leisure activities","advanceToMinus10pts(scenario.Step6cLostPoints)"]]
	},
	Step6bExtraPoints: {
		image: "Fig06bExtraPoints.jpg",
		text: "Congratulations you have spent some time doing your assignments and your earn extra points!",
		buttons: [["Continue", "advanceTo0pts(scenario.InfoBox)"]]
	},
	Step6cLostPoints: {
		image: "LostPoints.jpg",
		text: "Sorry you have lost some points, you have spend too much time on leisure activities",
		buttons: [["Continue", "advanceTo0pts(scenario.InfoBox)"]]
	},
	InfoBox: {
		image: "InfoBox.png",
		text: "",
		buttons: [["Continue", "advanceTo0pts(scenario.Step7)"]]
	},
	Step7: {
		image: "Fig07.png",
		text: "You are in the forest collecting plastic debris, when you found a squirrel with a plastic bag hanging from his neck. What do you do?",
		buttons: [["Inform immediately to the leader of the group", "advanceTo20pts(scenario.DoublePoints)"],["You try to free the squirrel by yourself","advanceTo10pts(scenario.Step08)"]]
	},
	DoublePoints: {
		image: "DoublePoints.png",
		text: "You have followed the guidance from your instructor and now the squirrel is free and safe, same as you. You have earned double points.",
		buttons: [["Continue", "advanceTo0pts(scenario.Step08)"]]
	},
	Step08: {
		image: "Fig08.png",
		text: "After the plastic cleaning session, you were concern of the amount of plastic bottles and bags that you and your classmates found. What do you do?",
		buttons: [["Talk about it to your classmates and your teachers during class", "advanceTo10pts(scenario.Step09)"],["Post the pictures that you took in your personal social media","advanceTo10pts(scenario.Step10)"]]
	},
	Step09: {
		image: "Fig09.png",
		text: "You have decided to share your concern to your class, and the teacher suggests that you can do a project about it. What do you do?",
		buttons: [["A small documentary of plastic pollution", "advanceTo20pts(scenario.Step11)"],["A general talk for all the school","advanceTo20pts(scenario.Step11)"]]
	},
	Step10: {
		image: "Fig10.png",
		text: "You have decided to post your video on your own social media, and the video has gone viral. However, one of the comments is negative and criticizes it. What do you do?",
		buttons: [["You get upset and reply criticizing people who leaves in the area", "advanceToMinus10pts(scenario.Step12)"],["You got upset but you don’t answer straight away. You ask for opinions between classmates and teachers","advanceTo10pts(scenario.Step13)"]]
	},
	Step11: {
		image: "Fig11.png",
		text: "You’ve decided to do a documentary or to prepare a talk for the school with your classmates. Many students and teachers suggest that you should post it in social media as a group on the school platform. What do you do?",
		buttons: [["You don’t like it, it was your idea and you want it in your private social media", "advanceToMinus10pts(scenario.Step10)"],["Go for it, it is a safe way to publish in social media and people will know your work", "advanceTo10pts(scenario.Step14Info)"]]
	},
	Step12: {
		image: "Fig12.png",
		text: "You’ve decided to criticize people who leaves in the area, then the situation become bad in the social media, and you have now negative reviews. You choose:",
		buttons: [["Tell a teacher about it and ask for advice", "advanceTo10pts(scenario.Step13)"],["Ask other classmates for advice", "advanceTo10pts(scenario.Step13)"]]
	},
	Step13: {
		image: "Fig13.png",
		text: "Your teacher or classmates advices you to offer an apology in your platform. You have made a mistake of judgment, and no one knows who is the responsible for the plastic rubbish. You choose:",
		buttons: [["To follow the teacher/classmates advice and apologise", "advanceTo10pts(scenario.Step14Info)"],["You don&#39t apologise", "advanceToMinus10pts(scenario.Step13b)"]]
	},
	Step13b: {
		image: "Fig13b.jpg",
		text: "You didn’t apologise, so you have lost some credibility",
		buttons: [["Continue", "advanceTo0pts(scenario.Step14Info)"]]
	},
	Step14Info: {
		image: "Fig14Info.png",
		text: "You and your team are at the common room discussing about the success of your presentation/video. You might even want to choose a career in engineering or science!. It is already late, so you decide to go to bed and continue talking in the morning",
		buttons: [["Continue", "advanceTo0pts(scenario.StepQuiz2)"]]
	},
	// history quiz
	StepQuiz2: {
		image: "Quiz.png",
		text: "A surprise quiz for some bonus points?",
		buttons: [["Yes please","advanceTo0pts(scenario.Q2History)"],["No, thanks.","advanceTo0pts(scenario.Step14Action)"]]
	},
	Q1History: {
		image: "CornwallQ1.jpg",
		text: "Has Cornwall been inhabited for 10,000 years now?",
		buttons: [["True", "advanceTo10pts(scenario.Q1HisAnswer)"],["False","badAnswer(scenario.Q1HisAnswer)"]]
	},
	Q1HisAnswer: {
		image: "CornwallQ1Answer.jpg",
		text: "True. There is evidence of occupation in Cornwall after the end of the last ice age, around 10,000 years ago",
		buttons: [["Continue", "advanceTo0pts(scenario.Q2History)"]]
	},
	Q2History: {
		image: "CornwallQ2.jpg",
		text: "How long was tin mined in Cornwall?",
		buttons: [["Only during the Bronze Age", "badAnswer(scenario.Q2HisAnswer)"],["During the 18th century", "badAnswer(scenario.Q2HisAnswer)"],["For 4,000 years","advanceTo10pts(scenario.Q2HisAnswer)"]]
	},
	Q2HisAnswer: {
		image: "CornwallQ2Answer.jpg",
		text: "The correct answer is &ldquo;For 4,000 years&rdquo;. Cornwall was a large trader of tin since the Bronze Age. The last tin mine closed in 1998.",
		buttons: [["Continue", "advanceTo0pts(scenario.Q3History)"]]
	},
	Q3History: {
		image: "CornwallQ3.jpg",
		text: "True or false that about 250,000 Cornish migrated abroad between 1861 and 1901 ",
		buttons: [["True", "advanceTo10pts(scenario.Q3HisAnswer)"],["False","badAnswer(scenario.Q3HisAnswer)"]]
	},
	Q3HisAnswer: {
		image: "CornwallQ3Answer.jpg",
		text: "True! It was a large Cornish emigration during the 18th and 19th century. People migrated to Australia, Argentina, Brazil, Canada, Mexico, New Zeland, USA, South Africa, and the Samoas",
		buttons: [["Continue", "advanceTo0pts(scenario.Q4History)"]]
	},
	Q4History: {
		image: "CornwallQ4.jpg",
		text: "True or false that a location in Gwenapp, Cornwall is the site of exploratory drilling for lithium, and also of the Deep Geothermal Power Project?",
		buttons: [["True", "advanceTo10pts(scenario.Q4HisAnswer)"],["False","badAnswer(scenario.Q4HisAnswer)"]]
	},
	Q4HisAnswer: {
		image: "CornwallQ4Answer.jpg",
		text: "True! Historic records show that lithium is contained within geothermal waters (or ‘hot springs’) which naturally circulate at depth beneath our feet in Cornwall.",
		buttons: [["Continue", "advanceTo0pts(scenario.Q5History)"]]
	},
	Q5History: {
		image: "CornwallQ5.jpg",
		text: "Is the Cornish language a critically endangered language?",
		buttons: [["True", "advanceTo10pts(scenario.Q5HisAnswer)"],["False","badAnswer(scenario.Q5HisAnswer)"]]
	},
	Q5HisAnswer: {
		image: "CornwallQ5Answer.jpg",
		text: "True! The modern Cornish evolved from ancient Celtic language, and there are only between 8000-13,000 fluent speakers.",
		buttons: [["Continue", "advanceTo0pts(scenario.Step14Action)"]]
	},
	Step14Action: {
		image: "Fig14Action.png",
		text: "You wake up late, so you’re late for breakfast. You hurry up and search for your mobile but it is nowhere. What do you do?",
		buttons: [["You ask you roommates if they have seen it ", "advanceTo10pts(scenario.Step15)"],["You tell the teacher","advanceTo10pts(scenario.Step16)"]]
	},
	Step15: {
		image: "Fig15.png",
		text: "No one has seen your mobile.One by one all your teammates tell you that their mobiles have been stolen. What do you do?",
		buttons: [["Tell a teacher", "advanceTo20pts(scenario.Step16)"],["Call the police","advanceTo10pts(scenario.Step17)"],["Enter other people’s rooms and search for yourselves","advanceToMinus10pts(scenario.Step18)"]]
	},
	Step16: {
		image: "Fig16.png",
		text: "You have told the teacher, who takes things in their hands. A group of students made a prank and stole your team mobiles. You have taken the best decision on this matter, you have recovered your mobile and you can continue with your activities.",
		buttons: [["Continue", "advanceTo0pts(scenario.Step19)"]]
	},
	Step17: {
		image: "Fig17.png",
		text: "You have chosen to call the police. However, you find out that you do not understand well what the police is saying.You choose:",
		buttons: [["Tell a teacher", "advanceTo10pts(scenario.Step16)"],["Take action in your hands and you and your teammates enter other people’s rooms and search for yourselves","advanceToMinus10pts(scenario.Step18)"]]
	},
	Step18: {
		image: "Fig18.png",
		text: "You and your teammates have decided to enter other people’s room without permission searching for your mobiles. Now, people are accusing you of robbery. They have talked with the teacher, and they have called the police.",
		buttons: [["Although you are facing an inquiry from teachers and police, the real thieves appeared, so you and your teammates get your mobiles back. Continue", "advanceTo0pts(scenario.Step19)"]]
	},
	Step19: {
		image: "Fig19.png",
		text: "The events with the prank have left you exhausted, and you don’t feel enthusiastic the next morning. What do you do?",
		buttons: [["You decide do not stand up to catch up breakfast. You are too exhausted", "advanceToMinus10pts(scenario.Step20)"],["You are tired but you stand up. Having breakfast will make you feel better","advanceTo10pts(scenario.Step21)"]]
	},
	// Quiz3: {
		// image: "Quiz1.png",
		// text: "A surprise quiz for some bonus points?",
		// buttons: [["Yes please", "maths_quiz()"],["No, thanks.","advanceTo10pts(scenario.Step19)"]]
	// },
	Step20: {
		image: "Fig20.png",
		text: "You didn’t stand up and you have missed the news: the teachers have decided to cancel all classes and make a picnic to the forest. What do you do?",
		buttons: [["Stand up quickly and catch the bus (hopefully some food is going to be there)", "advanceTo10pts(scenario.Step22)"],["You do not hurry and missed the bus","advanceToMinus10pts(scenario.Step23b)"]]
	},
	Step21: {
		image: "Fig21.png",
		text: "You are having breakfast when the teacher announces that you will have a day off in the forest. Everyone is going to go for a picnic to relax and recover from yesterday’s events.",
		buttons: [["Continue", "advanceTo0pts(scenario.Step22)"]]
	},
	Step22: {
		image: "Fig22.png",
		text: "During the picnic, you meet other students from France, Romania, and Italy and they would like to keep in touch after the language camp and maybe translate it to multiple languages.",
		buttons: [["You accept and add them to your contacts", "advanceTo10pts(scenario.Step23a)"],["You are suspicious that they will steal your idea and are not friendly with them","advanceTo0pts(scenario.Step23b)"]]
	},
	Step23a: {
		image: "Fig23a.png",
		text: "Language camp has finished and you are back at home. One of your new friends propose to do a new documentary on plastics. His/her mum is a sound engineer and she can help!",
		buttons: [["Congratulations, you are in your way for a successful career", "advanceTo0pts(scenario.End_of_Game)"]]
	},
	Step23b: {
		image: "Fig23b.png",
		text: "Language camp has finished and you are back at home. You have improved your language skills and gain experience documenting the struggles of nature. You have new friends and you are gaining confidence.",
		buttons: [["Congratulations, you are in your way for a successful career", "advanceTo0pts(scenario.End_of_Game)"]]
	},
	End_of_Game: {
		image: "GameOver.png",
		text: "You finished the game.",
		buttons: [["Play again?", "advanceToReset(scenario.Step1)"]]
	},
};

