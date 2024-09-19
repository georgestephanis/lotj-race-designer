import './App.css';
import { Component, Fragment } from 'react';

function RaceForm( props ) {
	return (
		<form id="race_form">
			<fieldset>
				<legend>Race Name?</legend>
				<label>
					<input type="text" name="race" value={ props.state.race } onChange={ props.onChange } />
				</label>
			</fieldset>
			<fieldset>
				<legend>Level Modifiers</legend>
				<LevelFilter cls="com" val={ props.state.com } onChange={ props.onChange } />
				<LevelFilter cls="pil" val={ props.state.pil } onChange={ props.onChange } />
				<LevelFilter cls="eng" val={ props.state.eng } onChange={ props.onChange } />
				<LevelFilter cls="hun" val={ props.state.hun } onChange={ props.onChange } />
				<LevelFilter cls="smu" val={ props.state.smu } onChange={ props.onChange } />
				<LevelFilter cls="lea" val={ props.state.lea } onChange={ props.onChange } />
				<LevelFilter cls="esp" val={ props.state.esp } onChange={ props.onChange } />
				<LevelFilter cls="sli" val={ props.state.sli } onChange={ props.onChange } />
				<LevelFilter cls="med" val={ props.state.med } onChange={ props.onChange } />
				<LevelFilter cls="sci" val={ props.state.sci } onChange={ props.onChange } />
			</fieldset>
			<fieldset>
				<legend>Stat Modifiers</legend>
				<StatFilter stat="str" val={ props.state.str } min="-7" max="7" onChange={ props.onChange } />
				<StatFilter stat="dex" val={ props.state.dex } min="-7" max="7" onChange={ props.onChange } />
				<StatFilter stat="con" val={ props.state.con } min="-7" max="7" onChange={ props.onChange } />
				<StatFilter stat="int" val={ props.state.int } min="-7" max="7" onChange={ props.onChange } />
				<StatFilter stat="wis" val={ props.state.wis } min="-7" max="7" onChange={ props.onChange } />
				<StatFilter stat="cha" val={ props.state.cha } min="-7" max="7" onChange={ props.onChange } />
				<StatFilter stat="lck" val={ props.state.lck } min="-10" max="10" onChange={ props.onChange } />
			</fieldset>
		</form>
	);
}

function LevelFilter( props ) {
	return <label>
		{props.cls}
		<input name={ props.cls } type="range" min="-100" max="100" value={ props.val } onChange={ props.onChange } />
		<input name={ props.cls } type="number" min="-100" max="100" value={ props.val } onChange={ props.onChange } />
	</label>;
}

function StatFilter( props ) {
	return <label>
		{props.stat}
		<input name={ props.stat } type="range" min={ props.min } max={ props.max } value={ props.val } onChange={ props.onChange } />
		{ props.prefix }<span>{ props.val }</span>
	</label>;
}

function ShowRace( props ) {
	const race = props.data;

	const classes = [
		'com',
		'pil',
		'eng',
		'hun',
		'smu',
		'lea',
		'esp',
		'sli',
		'med',
		'sci'
	];

	let rows = [];
	let any_valid = false;

	classes.forEach( mainclass => {
		// const levels  = props.adjust_levels( race, mainclass );
		const levels = race.levels[ mainclass ];
		const matches = true;

		rows.push( <ShowRaceClass key={ race.name + mainclass } race={ race.name } label={ mainclass } levels={ levels } matches={ matches } /> )
	});


	return (
		<div className={ 'race race-' + race.name }>
			<h3>
				{ race.name }
				&nbsp;<small>( <kbd>{ race.price.toLocaleString() }</kbd> + <kbd>{ race.deposit.toLocaleString() }</kbd> deposit )</small>
			</h3>
			<dl className="race-stats">
				<dt>Chonk:</dt>
				<dd>
					HP: <kbd>{ race.hp }</kbd>,
					AC: <kbd>{ race.ac }</kbd>
				</dd>
				<dt>Base:</dt>
				<dd>
					STR <kbd>{ race.str }</kbd>,
					DEX <kbd>{ race.dex }</kbd>,
					CON <kbd>{ race.con }</kbd>,
					INT <kbd>{ race.int }</kbd>,
					WIS <kbd>{ race.wis }</kbd>,
					CHA <kbd>{ race.cha }</kbd>
				</dd>
				<dt>Stats:</dt>
				<dd>
					STR <kbd>{ Math.min( 25, 18 + parseInt( race.str ) ) }</kbd>,
					DEX <kbd>{ Math.min( 25, 18 + parseInt( race.dex ) ) }</kbd>,
					CON <kbd>{ Math.min( 25, 18 + parseInt( race.con ) ) }</kbd>,
					INT <kbd>{ Math.min( 25, 18 + parseInt( race.int ) ) }</kbd>,
					WIS <kbd>{ Math.min( 25, 18 + parseInt( race.wis ) ) }</kbd>,
					CHA <kbd>{ Math.min( 25, 18 + parseInt( race.cha ) ) }</kbd>
				</dd>
			</dl>
			<ol className="levels-table">
				<li>
					&nbsp;&nbsp;&nbsp;
					<ol className="levels-row">
						<li>COM</li>
						<li>PIL</li>
						<li>ENG</li>
						<li>HUN</li>
						<li>SMU</li>
						<li>LEA</li>
						<li>ESP</li>
						<li>SLI</li>
						<li>MED</li>
						<li>SCI</li>
						<li>SUM</li>
					</ol>
				</li>
				{ rows }
			</ol>
			{ race.traits.map( trait => ( <p key={ race.name + trait } className="trait">{ trait }</p> ) ) }
		</div>
	);
}

function ShowRaceClass( props ) {
	return (
		<li className={ 'class-' + props.label + ' ' + ( props.matches ? 'match' : 'nomatch' ) }>
			{ props.label }
			<ol className="levels-row">
				<li className={ 't-' + Math.floor( props.levels.com / 25 ) }>{ props.levels.com }</li>
				<li className={ 't-' + Math.floor( props.levels.pil / 25 ) }>{ props.levels.pil }</li>
				<li className={ 't-' + Math.floor( props.levels.eng / 25 ) }>{ props.levels.eng }</li>
				<li className={ 't-' + Math.floor( props.levels.hun / 25 ) }>{ props.levels.hun }</li>
				<li className={ 't-' + Math.floor( props.levels.smu / 25 ) }>{ props.levels.smu }</li>
				<li className={ 't-' + Math.floor( props.levels.lea / 25 ) }>{ props.levels.lea }</li>
				<li className={ 't-' + Math.floor( props.levels.esp / 25 ) }>{ props.levels.esp }</li>
				<li className={ 't-' + Math.floor( props.levels.sli / 25 ) }>{ props.levels.sli }</li>
				<li className={ 't-' + Math.floor( props.levels.med / 25 ) }>{ props.levels.med }</li>
				<li className={ 't-' + Math.floor( props.levels.sci / 25 ) }>{ props.levels.sci }</li>
				<li className="total">{ Object.values( props.levels ).reduce( ( a, b ) => a + b ) + ( 'LEA' === props.label ? 30 : 0 ) }</li>
			</ol>
		</li>
	)
}

function BuildRace( state ) {
	const race = {
		name:      state.race,
		shortdesc: 'Human',
		language:  'basic',
		apponly:   'No',
	
		skincolors: [],
		traits:     [],
		price:      0,
		deposit:    0,
		hp:         1000,
		ac:         0,

		levels: {}
	};

	// Stats ...
	race.str = state.str;
	race.dex = state.dex;
	race.con = state.con;
	race.int = state.int;
	race.wis = state.wis;
	race.cha = state.cha;
	race.lck = state.lck;
	race.frc = state.frc;

	// Levels ...
	race.levels.com = BuildRaceLevels( 'com', state );
	race.levels.pil = BuildRaceLevels( 'pil', state );
	race.levels.eng = BuildRaceLevels( 'eng', state );
	race.levels.hun = BuildRaceLevels( 'hun', state );
	race.levels.smu = BuildRaceLevels( 'smu', state );
	race.levels.lea = BuildRaceLevels( 'lea', state );
	race.levels.esp = BuildRaceLevels( 'esp', state );
	race.levels.sli = BuildRaceLevels( 'sli', state );
	race.levels.med = BuildRaceLevels( 'med', state );
	race.levels.sci = BuildRaceLevels( 'sci', state );

	return race;
}

// All modifications are from a base of 55 @ 18's stat

// Humans get +10 combat, -9 smug, +25 leadership, +12 esp, +7 sli +15 med, +61 sci
const class_modifiers = {
	"com": {
		"com": 100,
		"pil": 0,
		"eng": 0,
		"hun": -20,
		"smu": 0,
		"lea": 25,
		"esp": 15,
		"sli": 0,
		"med": 0,
		"sci": 0
	},
	"pil": {
		"com": 10,
		"pil": 100,
		"eng": 20,
		"hun": -25,
		"smu": 15,
		"lea": 0,
		"esp": 0,
		"sli": 25,
		"med": 15,
		"sci": 0
	},
	"eng": {
		"com": 10,
		"pil": 25,
		"eng": 100,
		"hun": -25,
		"smu": 20,
		"lea": 0,
		"esp": 0,
		"sli": 20,
		"med": 25,
		"sci": 25
	},
	"hun": {
		"com": 45,
		"pil": 0,
		"eng": 0,
		"hun": 100,
		"smu": 0,
		"lea": 0,
		"esp": 0,
		"sli": 0,
		"med": 0,
		"sci": 0
	},
	"smu": {
		"com": 10,
		"pil": 40,
		"eng": 0,
		"hun": -25,
		"smu": 100,
		"lea": 0,
		"esp": 0,
		"sli": 0,
		"med": 0,
		"sci": 0
	},
	"lea": {
		"com": 10,
		"pil": 0,
		"eng": 0,
		"hun": -25,
		"smu": 0,
		"lea": 100,
		"esp": 0,
		"sli": 0,
		"med": 0,
		"sci": 0
	},
	"esp": {
		"com": -5,
		"pil": 30,
		"eng": 15,
		"hun": -60, // ?
		"smu": 70,
		"lea": -55,
		"esp": 100,
		"sli": 60,
		"med": 0,
		"sci": 0
	},
	"sli": {
		"com": 10,
		"pil": 0,
		"eng": 20,
		"hun": -25,
		"smu": 0,
		"lea": 0,
		"esp": 30,
		"sli": 100,
		"med": 0,
		"sci": 0
	},
	"med": {
		"com": 10,
		"pil": 0,
		"eng": 0,
		"hun": -25,
		"smu": 0,
		"lea": 10,
		"esp": 0,
		"sli": 0,
		"med": 100,
		"sci": 0
	},
	"sci": {
		"com": 10,
		"pil": 0,
		"eng": 40,
		"hun": -25,
		"smu": 0,
		"lea": 0,
		"esp": 0,
		"sli": 0,
		"med": 0,
		"sci": 100
	}
}

function BuildRaceLevels( main, state ) {
	const levels = {
		"com": 55,
		"pil": 55,
		"eng": 55,
		"hun": 55,
		"smu": 55,
		"lea": 55,
		"esp": 55,
		"sli": 55,
		"med": 55,
		"sci": 55
	};

	if ( class_modifiers[ main ] ) {
		// Apply our race modifiers.
		levels.com += class_modifiers[ main ].com;
		levels.pil += class_modifiers[ main ].pil;
		levels.eng += class_modifiers[ main ].eng;
		levels.hun += class_modifiers[ main ].hun;
		levels.smu += class_modifiers[ main ].smu;
		levels.lea += class_modifiers[ main ].lea;
		levels.esp += class_modifiers[ main ].esp;
		levels.sli += class_modifiers[ main ].sli;
		levels.med += class_modifiers[ main ].med;
		levels.sci += class_modifiers[ main ].sci;
	}

	// Apply our race modifiers.
	levels.com += state.com;
	levels.pil += state.pil;
	levels.eng += state.eng;
	levels.hun += state.hun;
	levels.smu += state.smu;
	levels.lea += state.lea;
	levels.esp += state.esp;
	levels.sli += state.sli;
	levels.med += state.med;
	levels.sci += state.sci;

	// Apply our level modifiers. -- figure for maxes?
	// How high can someone reach with 2 gains and cybers?

	// Normalize for min/max between 1 and 150
	for ( const [ cls, lvl ] of Object.entries( levels ) ) {
		if ( 150 < lvl ) {
			levels[ cls ] = 150;
		} else if ( 1 > lvl ) {
			levels[ cls ] = 1;
		}
	}

	return levels;
}

class App extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			race: '',

			// Level filters:
			com: 0,
			pil: 0,
			eng: 0,
			hun: 0,
			smu: 0,
			lea: 0,
			esp: 0,
			sli: 0,
			med: 0,
			sci: 0,

			// Stat modifiers:
			str: 0,
			dex: 0,
			con: 0,
			int: 0,
			wis: 0,
			cha: 0,
			lck: 0,
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.adjust_levels = this.adjust_levels.bind(this);
	}

	adjust_levels( race, classBeingChecked ) {
		// We need the `{ ...levels }` to make sure we don't modify the original by reference!
		let levels = { ...race.levels[ classBeingChecked.toLowerCase() ] };

		// Make sure we're handling cases where the known level is limited by min/max.
		for ( const [ cls, lvl ] of Object.entries( levels ) ) {
			if ( 150 === lvl ) {
				levels[ cls ] = 200;
			} else if ( 1 === lvl ) {
				levels[ cls ] = -50;
			} else if ( 0 === lvl ) {
				levels[ cls ] = -50;
			}
		}

		// Account for stats maxing out at 25, so 7 over a base of 18.
		const stats = {
			str: Math.min( 7 - race.str, this.state.STR ),
			dex: Math.min( 7 - race.dex, this.state.DEX ),
			con: Math.min( 7 - race.con, this.state.CON ),
			int: Math.min( 7 - race.int, this.state.INT ),
			wis: Math.min( 7 - race.wis, this.state.WIS ),
			cha: Math.min( 7 - race.cha, this.state.CHA ),
			lck: parseInt( this.state.LCK )
		};

		// Apply our level modifiers.
		levels.com += ( stats.str + stats.con);
		levels.pil += ( stats.dex * 2 );
		levels.eng += ( stats.int * 2 );
		levels.hun += ( stats.con * 2 );
		levels.smu += ( ( stats.lck * 2 ) + stats.cha );
		levels.lea += ( stats.cha + stats.wis );
		levels.esp += ( stats.dex + stats.lck );
		levels.sli += ( stats.wis + stats.lck );
		levels.med += ( stats.int + stats.wis );
		levels.sci += ( stats.int * 2 );

		// If this character could feasibly use the force...
		if ( ( 'HUN' !== classBeingChecked ) && ! race.traits.includes( 'Force Insensitivity - This race cannot use the Force.' ) ) {
			if ( 'guardian' === this.state.force ) {
				levels.com += 70;
				levels.pil += 20;
				levels.esp += 30;
			} else if ( 'sentinel' === this.state.force ) {
				levels.com += 40;
				levels.smu += 50;
				levels.sli += 30;
			} else if ( 'consular' === this.state.force ) {
				levels.com += 40;
				levels.eng += 30;
				levels.lea += 50;
			}
		}

		for ( const [ cls, lvl ] of Object.entries( levels ) ) {
			if ( lvl > 150 ) {
				levels[ cls ] = 150;
			} else if ( lvl < 1 ) {
				levels[ cls ] = 1;
			}
		}

		return levels;
	}

	handleInputChange( event ) {
		const target = event.target;
		const name = target.name;
		let value = target.value;
console.log( target );
		if ( 'trait[]' === name ) {
			const traits = this.state.traits;
			const traitIndex = traits.indexOf( value );
			if ( target.checked ) {
				if ( -1 === traitIndex ) {
					traits.push( value );
				}
			} else if ( ! target.checked ) {
				if ( -1 !== traitIndex ) {
					// The checkbox was deselected, and the trait is in our filter list, remove it.
					traits.splice( traitIndex, 1 );
				}
			}
			traits.sort();
			this.setState( { traits } );
			return;
		}

		if ( 'search' === target.type ) {
			value = target.value;
		} else if ( 'checkbox' === target.type ) {
			value = target.checked;
		} else if ( 'range' === target.type ) {
			value = parseInt( target.value, 10 );
		} else if ( 'number' === target.type ) {
			if ( 'string' !== typeof target.value ) {
				value = 0;
			}
			value = parseInt( target.value, 10 );
			if ( value > target.max ) {
				value = target.max;
			} else if ( value < target.min ) {
				value = target.min;
			}
		} else if ( 'radio' === target.type ) {
			if ( target.checked ) {
				value = target.value;
			} else {
				// If it's unchecked don't set anything as the one that just got selected will set it.
				return;
			}
		}

		this.setState( {
			[ name ]: value
		} );
	}

	render() {
		return (
			<Fragment>
				<RaceForm onChange={ this.handleInputChange } state={ this.state } />
				<div className="results-list">
					<ShowRace key={ this.state.name } data={ BuildRace( this.state ) } />
				</div>
			</Fragment>
		);
	}
}

export default App;
