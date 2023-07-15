	let allBtn = Array.from(document.querySelectorAll('span:not(.colored-spcl ,#dlt , .bk , .rf , .faq span)'));
let allHoverBtn = Array.from(document.querySelectorAll('span:not(.colored-spcl)'));
let acBtn = document.querySelector('.dlt');
let result = document.querySelector('.result');
let backBtn = document.querySelector('.bk');
let getEval = document.querySelector('#getEval');
let prcnt = document.querySelector('#prcnt');
let divider = document.querySelector('#divider');
let inputArr = ['0'];
let rfBtn = document.querySelector('.rf');
let multiPrt = document.querySelector('#multi');
let minusPrt = document.querySelector('#minus');
let dot = document.querySelector('.dot');

result.textContent = '0';

function resetAll() {
	allHoverBtn.forEach(
		(elem) => {
			elem.style.background = '#ffffff';
		}
	)
}

function typeAnim() {
	// body...
	result.style.animation = 'pop .3s ease';
	setTimeout(() => {
		result.style.animation = 'none';
	}, 300);
}
allHoverBtn.forEach((elem) => {
	elem.addEventListener('touchstart', () => {
		resetAll();
		elem.style.background = '#f9f9f9';
	})
	elem.addEventListener('touchend', () => {
		setTimeout(resetAll, 200);
	})
});
allBtn.forEach(
	(elem, index, arr) => {
		elem.addEventListener('touchstart', () => {
			if (!(elem.className == 'dot')) {
				if ( inputArr[0] == 0 && inputArr[1] !== '+' && elem.textContent !== '+' && inputArr[1] !== '*' && elem.textContent !== '*' && inputArr[1] !== '-' && elem.textContent !== '-' && inputArr[1] !== '/' && elem.textContent !== '/' && inputArr[1] !== '%' && elem.textContent !== '%' && inputArr[1] !== ')' && elem.textContent !== ')' && inputArr[1] !== '.' && elem.textContent !== '.')
				{
					//console.log(inputArr)
					if (inputArr[0].length == 1 && inputArr[0] == 0) {
						//console.log(inputArr)
						inputArr.shift();
						result.textContent = '';
					}
					
				}
			}
			maintainResultFont();
			removeEqualSign();
			if (elem.textContent == 'π') {
				inputArr.push('3.14159');
			}
			else {
				//alert("push")
				if(elem.textContent!==''){
				inputArr.push(elem.textContent);
				//console.log(inputArr)
				}
			}
			result.textContent += inputArr[inputArr.length - 1];
			if (inputArr.length == 2) {
				if ((inputArr[0] == '= ')) {
					inputArr.shift();
				}
			} 
		})
	}
)

dlt.onclick = () => {
	result.textContent = '';
	inputArr = [];
	defaultParameter();
	maintainResultFont();
	result.style.color = 'rgba(0,0,0,0.8)';
}

function dltOneByOne() {
	console.log(inputArr)
	if (inputArr.length == 2 && inputArr[0] == '= ') {
		inputArr = [];
	}
	inputArr.pop();
	console.log(inputArr);
	result.textContent = '';
	inputArr.forEach((elemnt) => {
		result.textContent += elemnt;
	})
	defaultParameter();
	maintainResultFont();
}
backBtn.onclick = () => {
	dltOneByOne();
	result.style.color = 'rgba(0,0,0,0.8)';
}
backBtn.addEventListener('long-press', dltOneByOne);

function defaultParameter() {
	if (inputArr.length == 0 ) {
		inputArr.push('0');
		result.textContent = inputArr[0];
	}
}

function maintainResultFont() {
	if (inputArr.length >= 40 && inputArr.length <= 65) {
		result.classList.add('small-font');
		result.classList.remove('sec-small-font');
		result.classList.remove('third-font');
		result.classList.remove('very-small');
	}
	else if (inputArr.length >= 66 && inputArr.length <= 100) {
		result.classList.remove('small-font');
		result.classList.remove('third-font');
		result.classList.add('sec-small-font');
		result.classList.remove('very-small');
	}
	else if (inputArr.length >= 101 && inputArr.length <= 180) {
		result.classList.remove('small-font');
		result.classList.remove('sec-small-font');
		result.classList.add('third-font');
		result.classList.remove('very-small');
	}
	else if (inputArr.length >= 181) {
		result.classList.remove('small-font');
		result.classList.remove('sec-small-font');
		result.classList.remove('third-font');
		result.classList.add('very-small');
	}
	else {
		result.classList.remove('small-font');
		result.classList.remove('sec-small-font');
		result.classList.remove('third-font');
		result.classList.remove('very-small');
	}
}

function removeEqualSign() {
	if (inputArr[0] == '= ') {
		result.textContent = '';
		inputArr.shift();
		result.style.color = 'rgba(0,0,0,0.8)';
		inputArr.forEach((e) => {
			result.textContent += e;
		})
	}
}

getEval.addEventListener('click', () => {
	removeEqualSign();
	inputArr = [];
	let calc;
	if (result.textContent == '∞') {
		calc = '0';
	}
	else {
		console.log(inputArr)
		if(inputArr[inputArr.length - 1]=='0'&& inputArr[inputArr.length - 2]=='/'){
			calc="can't divide by zero";
			result.textContent="can't divide by zero";
		}else{
		     calc = eval(result.textContent);
		}
	}
	if (calc === Infinity && inputArr[inputArr.length - 1]=='0'&& inputArr[inputArr.length - 2]=='/') {
		calc = '∞';
		result.textContent = '∞';
		inputArr.push(Infinity);
	}
	else {
		inputArr = Array.from(String(calc));
	}
	inputArr.unshift('= ')
	result.textContent = '';
	inputArr.forEach((e) => {
		if (e === Infinity) {
			result.textContent = '= ∞';
		} else {
			result.textContent += e;
			result.style.color = '#FF7433';
		}

	})
	maintainResultFont();
});
let toggle = true;
rfBtn.addEventListener('click', () => {
	if (toggle) {
		toggle = false;
		prcnt.textContent = '(';
		divider.textContent = ')';
		dot.textContent = 'π';
		if (dot.textContent == 'π') {
			dot.style.color = '#FF7433';
		}
	}
	else {
		toggle = true;
		prcnt.textContent = '%';
		divider.textContent = '/';
		dot.textContent = '.';
		dot.style.color = 'black';
	}
	rfBtn.style.animation = 'rotate .3s ease';
	setTimeout(() => { rfBtn.style.animation = 'none'; }, 300);
})