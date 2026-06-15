const conditions = [
    {
        name: "Blinded",
        icon: "systems/dnd5e/icons/svg/statuses/blinded.svg",
        text: "<p>While you have the Blinded condition, you experience the following effects.<br/>" +
            "<b>Can’t See.</b> You can’t see and automatically fail any ability check that requires sight.<br/>" +
            "<b>Attacks Affected.</b> Attack rolls against you have Advantage, and your attack rolls have Disadvantage.</p>",
        effects: {
            general: "Can’t See. You can’t see and automatically fail any ability check that requires sight.",
            attack: {
                others: "Advantage",
                you: {
                    text: "Disadvantage",
                    target: "all",
                },
            }
        }
    },
    {
        name: "Charmed",
        icon: "systems/dnd5e/icons/svg/statuses/charmed.svg",
        text: "<p>While you have the Charmed condition, you experience the following effects.<br/>" +
            "<b>Can’t Harm the Charmer.</b> You can’t attack the charmer or target the charmer with damaging abilities or magical effects.<br/>" +
            "<b>Social Advantage.</b> The charmer has Advantage on any ability check to interact with you socially.</p>",
        effects: {
            general: "Can’t Harm the Charmer. You can’t attack the charmer or target the charmer with damaging abilities or magical effects.\n" +
                "Social Advantage. The charmer has Advantage on any ability check to interact with you socially.",
        }
    },
    {
        name: "Deafened",
        icon: "systems/dnd5e/icons/svg/statuses/deafened.svg",
        text: "<p>While you have the Deafened condition, you experience the following effect.<br/>" +
            "<b>Can’t Hear.</b> You can’t hear and automatically fail any ability check that requires hearing.</p>",
        effects: {
            general: "Can’t Hear. You can’t hear and automatically fail any ability check that requires hearing.",
        }
    },
    {
        name: "Exhaustion",
        icon: "systems/dnd5e/icons/svg/statuses/exhaustion.svg",
        text: "<p>While you have the Exhaustion condition, you experience the following effects.<br/>" +
            "<b>Exhaustion Levels.</b> This condition is cumulative. Each time you receive it, you gain 1 Exhaustion level. You die if your Exhaustion level is 6.<br/>" +
            "<b>d20 Tests Affected.</b> When you make a d20 Test, the roll is reduced by 2 times your Exhaustion level.<br/>" +
            "<b>Reduced.</b> Your Speed is reduced by a number of feet equal to 5 times your Exhaustion level.<br/>" +
            "<b>Removing Exhaustion Levels.</b> Finishing a Long Rest removes 1 of your Exhaustion levels. When your Exhaustion level reaches 0, the condition ends.</p>",
        effects: {
            general: "Exhaustion Levels. This condition is cumulative. Each time you receive it, you gain 1 Exhaustion level. You die if your Exhaustion level is 6.\n" +
                "d20 Tests Affected. When you make a d20 Test, the roll is reduced by 2 times your Exhaustion level.",
            speed: {
                text: "Speed Reduced. Your Speed is reduced by a number of feet equal to 5 times your Exhaustion level."
            }
        }
    },
    {
        name: "Frightened",
        icon: "systems/dnd5e/icons/svg/statuses/frightened.svg",
        text: "<p>While you have the Frightened condition, you experience the following effects.<br/>" +
            "<b>Ability Checks and Attacks Affected.</b> You have Disadvantage on ability checks and attack rolls while the source of fear is within line of sight.<br/>" +
            "<b>Can’t Approach.</b> You can’t willingly move closer to the source of fear.</p>",
        effects: {
            general: "Can’t Approach. You can’t willingly move closer to the source of fear.",
            attack: {
                you: "Disadvantage",
                additional: "while the source of fear is within line of sight."
            },
            ability_checks: {
                all: "Disadvantage",
                additional: "while the source of fear is within line of sight.",
            }
        }
    },
    {
        name: "Grappled",
        icon: "systems/dnd5e/icons/svg/statuses/grappled.svg",
        text: "<p>While you have the Grappled condition, you experience the following effects.<br/>" +
            "<b>Speed 0.</b> Your Speed is 0 and can’t increase.<br/>" +
            "<b>Attacks Affected.</b> You have Disadvantage on attack rolls against any target other than the grappler.<br/>" +
            "<b>Movable.</b> The grappler can drag or carry you when it moves, but every foot of movement costs it 1 extra foot unless you are Tiny or two or more sizes smaller than it.</p>",
        effects: {
            general: "Movable. The grappler can drag or carry you when it moves, but every foot of movement costs it 1 extra foot unless you are Tiny or two or more sizes smaller than it.",
            speed: {
                text: "Speed 0. Your Speed is 0 and can’t increase.",
                value: 0
            },
            attack: {
                you: {
                    text: "Disadvantage",
                    target: "any target other than the grappler",
                },
            }
        }
    },
    {
        name: "Incapacitated",
        icon: "systems/dnd5e/icons/svg/statuses/incapacitated.svg",
        text: "<p>While you have the Incapacitated condition, you experience the following effects.<br/>" +
            "<b>Inactive.</b> You can’t take any action, Bonus Action, or Reaction.<br/>" +
            "<b>No Concentration.</b> Your Concentration is broken.<br/>" +
            "<b>Speechless.</b> You can’t speak.<br/>" +
            "<b>Surprised.</b> If you’re Incapacitated when you roll Initiative, you have Disadvantage on the roll.</p>",
        effects: {
            general: "Inactive. You can’t take any action, Bonus Action, or Reaction.\n" +
                "No Concentration. Your Concentration is broken.\n" +
                "Speechless. You can’t speak.\n" +
                "Surprised. If you’re Incapacitated when you roll Initiative, you have Disadvantage on the roll."
        }
    },
    {
        name: "Invisible",
        icon: "systems/dnd5e/icons/svg/statuses/invisible.svg",
        text: "<p>While you have the Invisible condition, you experience the following effects.<br/>" +
            "<b>Surprise.</b> If you’re Invisible when you roll Initiative, you have Advantage on the roll.<br/>" +
            "<b>Concealed.</b> You aren’t affected by any effect that requires its target to be seen unless the effect’s creator can somehow see you. Any equipment you are wearing or carrying is also concealed.<br/>" +
            "<b>Attacks Affected.</b> Attack rolls against you have Disadvantage, and your attack rolls have Advantage. If a creature can somehow see you, you don’t gain this benefit against that creature.</p>",
        effects: {
            general: "Surprise. If you’re Invisible when you roll Initiative, you have Advantage on the roll.\n" +
                "Concealed. You aren’t affected by any effect that requires its target to be seen unless the effect’s creator can somehow see you. Any equipment you are wearing or carrying is also concealed.\n",
            attack: {
                others: "Disadvantage",
                you: {
                    text: "Advantage",
                    target: "all",
                },
                additional: "If a creature can somehow see you, you don’t gain this benefit against that creature."
            }
        }
    },
    {
        name: "Paralyzed",
        icon: "systems/dnd5e/icons/svg/statuses/paralyzed.svg",
        text: "<p>While you have the Paralyzed condition, you experience the following effects.<br/>" +
            "<b>Incapacitated.</b> You have the Incapacitated condition.<br/>" +
            "<b>Speed 0.</b> Your Speed is 0 and can’t increase.<br/>" +
            "<b>Saving Throws Affected.</b> You automatically fail Strength and Dexterity saving throws.<br/>" +
            "<b>Attacks Affected.</b> Attack rolls against you have Advantage.<br/>" +
            "<b>Automatic Critical Hits.</b> Any attack roll that hits you is a Critical Hit if the attacker is within 5 feet of you.</p>",
        other_conditions: [
            "Incapacitated"
        ],
        effects: {
            general: "Automatic Critical Hits. Any attack roll that hits you is a Critical Hit if the attacker is within 5 feet of you.",
            speed: {
                text: "Speed 0. Your Speed is 0 and can’t increase.",
                value: 0
            },
            attack: {
                others: "Advantage",
            },
            saving_throws: {
                strength: "automatically failed",
                dexterity: "automatically failed",
            }
        }
    },
    {
        name: "Petrified",
        icon: "systems/dnd5e/icons/svg/statuses/petrified.svg",
        text: "<p>While you have the Petrified condition, you experience the following effects.<br/>" +
            "<b>Turned to Inanimate Substance.</b> You are transformed, along with any nonmagical objects you are wearing and carrying, into a solid inanimate substance (usually stone). Your weight increases by a factor of ten, and you cease aging.<br/>" +
            "<b>Incapacitated.</b> You have the Incapacitated condition.<br/>" +
            "<b>Speed 0.</b> Your Speed is 0 and can’t increase.<br/>" +
            "<b>Attacks Affected.</b> Attack rolls against you have Advantage.<br/>" +
            "<b>Saving Throws Affected.</b> You automatically fail Strength and Dexterity saving throws.<br/>" +
            "<b>Resist Damage.</b> You have Resistance to all damage.<br/>" +
            "<b>Poison Immunity.</b> You have Immunity to the Poisoned condition.</p>",
        other_conditions: [
            "Incapacitated"
        ],
        effects: {
            general: "Turned to Inanimate Substance. You are transformed, along with any nonmagical objects you are wearing and carrying, into a solid inanimate substance (usually stone). Your weight increases by a factor of ten, and you cease aging.\n" +
                "Resist Damage. You have Resistance to all damage.\n" +
                "Poison Immunity. You have Immunity to the Poisoned condition.",
            speed: {
                text: "Speed 0. Your Speed is 0 and can’t increase.",
                value: 0
            },
            attack: {
                others: "Advantage",
            },
            saving_throws: {
                strength: "automatically failed",
                dexterity: "automatically failed",
            }
        }
    },
    {
        name: "Poisoned",
        icon: "systems/dnd5e/icons/svg/statuses/poisoned.svg",
        text: "<p>While you have the Poisoned condition, you experience the following effect.<br/>" +
            "<b>Ability Checks and Attacks Affected.</b> You have Disadvantage on attack rolls and ability checks.</p>",
        effects: {
            general: "",
            attack: {
                you: {
                    text: "Disadvantage",
                    target: "all",
                },
            },
            ability_checks: {
                all: "Disadvantage",
            }
        }
    },
    {
        name: "Prone",
        icon: "systems/dnd5e/icons/svg/statuses/prone.svg",
        text: "<p>While you have the Prone condition, you experience the following effects.<br/>" +
            "<b>Restricted Movement.</b> Your only movement options are to crawl or to spend an amount of movement equal to half your Speed (round down) to right yourself and thereby end the condition. If your Speed is 0, you can’t right yourself.<br/>" +
            "<b>Attacks Affected.</b> You have Disadvantage on attack rolls. An attack roll against you has Advantage if the attacker is within 5 feet of you. Otherwise, that attack roll has Disadvantage.</p>",
        effects: {
            general: "",
            speed: {
                text: "Speed 0. Your Speed is 0 and can’t increase.",
                value: 0
            },
            attack: {
                others: "Advantage",
                you: {
                    text: "Disadvantage",
                    target: "all",
                },
            }
        }
    },
    {
        name: "Restrained",
        icon: "systems/dnd5e/icons/svg/statuses/restrained.svg",
        text: "<p>While you have the Restrained condition, you experience the following effects.<br/>" +
            "<b>Speed 0.</b> Your Speed is 0 and can’t increase.<br/>" +
            "<b>Attacks Affected.</b> Attack rolls against you have Advantage, and your attack rolls have Disadvantage.<br/>" +
            "<b>Saving Throws Affected.</b> You have Disadvantage on Dexterity saving throws.</p>",
        effects: {
            general: "",
            speed: {
                text: "Speed 0. Your Speed is 0 and can’t increase.",
                value: 0
            },
            attack: {
                others: "Advantage",
                you: {
                    text: "Disadvantage",
                    target: "all",
                },
            },
            saving_throws: {
                dexterity: "Disadvantage",
            }
        }
    },
    {
        name: "Stunned",
        icon: "systems/dnd5e/icons/svg/statuses/stunned.svg",
        text: "<p>While you have the Stunned condition, you experience the following effects.<br/>" +
            "<b>Incapacitated.</b> You have the Incapacitated condition.<br/>" +
            "<b>Saving Throws Affected.</b> You automatically fail Strength and Dexterity saving throws.\<br/>" +
            "<b>Attacks Affected.</b> Attack rolls against you have Advantage.</p>",
        other_conditions: [
            "Incapacitated"
        ],
        effects: {
            general: "",
            attack: {
                others: "Advantage",
            },
            saving_throws: {
                strength: "automatically failed",
                dexterity: "automatically failed",
            }
        }
    },
    {
        name: "Unconscious",
        icon: "systems/dnd5e/icons/svg/statuses/unconscious.svg",
        text: "<p>While you have the Unconscious condition, you experience the following effects.<br/>" +
            "<b>Inert.</b> You have the Incapacitated and Prone conditions, and you drop whatever you’re holding. When this condition ends, you remain Prone.<br/>" +
            "<b>Speed 0.</b> Your Speed is 0 and can’t increase.<br/>" +
            "<b>Attacks Affected.</b> Attack rolls against you have Advantage.<br/>" +
            "<b>Saving Throws Affected.</b> You automatically fail Strength and Dexterity saving throws.<br/>" +
            "<b>Automatic Critical Hits.</b> Any attack roll that hits you is a Critical Hit if the attacker is within 5 feet of you.<br/>" +
            "<b>Unaware.</b> You’re unaware of your surroundings.</p>",
        other_conditions: [
            "Incapacitated",
            "Prone"
        ],
        effects: {
            general: "Inert. You drop whatever you’re holding. When this condition ends, you remain Prone.\n" +
                "Automatic Critical Hits. Any attack roll that hits you is a Critical Hit if the attacker is within 5 feet of you.\n" +
                "Unaware. You’re unaware of your surroundings.",
            speed: {
                text: "Speed 0. Your Speed is 0 and can’t increase.",
                value: 0
            },
            attack: {
                others: "Advantage",
            },
            saving_throws: {
                strength: "automatically failed",
                dexterity: "automatically failed",
            }
        }
    },
    {
        name: "Dazed",
        icon: "icons/magic/control/fear-fright-white.webp",
        text: "<p>A dazed creature can only do one of the following things on their turn: move, use an action, or use a bonus action. If a creature becomes dazed during their turn, their turn ends.<br/>" +
            "When a dazed creature is affected by a spell or effect that gives them an extra action on their turn (like the haste spell or the fighter’s Action Surge feature), they can still take this extra action, in addition to the movement, action, or bonus action allowed by the dazed condition.</p>",
        effects: {
            general: "A dazed creature can only do one of the following things on their turn: move, use an action, or use a bonus action. If a creature becomes dazed during their turn, their turn ends.\n" +
                "When a dazed creature is affected by a spell or effect that gives them an extra action on their turn (like the haste spell or the fighter’s Action Surge feature), they can still take this extra action, in addition to the movement, action, or bonus action allowed by the dazed condition."
        }
    },
]

//-------------------------------------------------------------------------------------
// Coding beginns here, please do not change.
//-------------------------------------------------------------------------------------

const cardPrefix = '<div class="dnd5e2 chat-card item-card">';
const cardSuffix = '</div>';
const headerPrefix = '<section class="card-header description collapsible">';
const headerSuffix = '</section>';

function conditionToCard(condition) {
    return headerPrefix +
        `<header class="summary"><img src="${condition.icon}" alt="${condition.name}"><div class="name-stacked border"><span class="title">${condition.name}</span></div></header>` +
        condition.text +
        headerSuffix;
}

function printCondition(condition) {
    let conditionsToPrint = [condition]
    conditionsToPrint.forEach((condition) => {
        if (condition.other_conditions) {
            condition.other_conditions.forEach(oc => {
                conditionsToPrint.push(conditions.filter(c => c.name === oc)[0]);
            })
        }
    });
    conditionsToPrint = conditionsToPrint.filter((v, i, a) => a.indexOf(v) === i);

    const conditionCards = conditionsToPrint.map(condition => conditionToCard(condition));

    let chatData = {
        user: game.user.id,
        content: cardPrefix + conditionCards.join("") + cardSuffix,
        blind: false
    };
    ChatMessage.create(chatData);
}

function compare(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

function conditionsString() {
    const conditionsStrings = conditions.sort(compare).map(condition => `
    <td><div id="${condition.name}"><img class="effect-control" style="height: 1em" src="${condition.icon}" data-action="effect" alt=""/>${condition.name}</div></td>`)

    let result = "";

    let i = 0;
    for (; i < conditionsStrings.length; i++) {
        if (i > 0 && i % 3 === 0) {
            result += '</tr><tr>'
        }
        result += conditionsStrings[i]
    }

    if (result.endsWith('</tr><tr>')) {
        result = result.substring(0, result.length - '</tr><tr>'.length);
    }
    for (; i % 3 !== 0; i++) {
        result += '<td></td>';
    }

    return result
}

const popupTemplate = `
<table style="margin: 0">
  <tr>
  ${conditionsString()}
  </tr>
</table>
`;

let d = new foundry.applications.api.DialogV2({
    window: {title: 'Condition Texts'},
    content: popupTemplate,
    buttons: [{
        action: 'cancel',
        icon: '<i class="fas fa-times"></i>',
        label: "Never mind",
        default: true,
    }],
    submit: () => {
        /* ignored */
    }
});
d.render(true).then((dialog) => {
    const refButton = dialog.element.getElementsByTagName('button')[0];
    const refButtonStyle = window.getComputedStyle(refButton);

    const style = document.createElement('style');
    style.appendChild(document.createTextNode(`
        table tbody tr td div {
            display: flex;
            justify-content: center;
            align-items: center;
            height: ${refButtonStyle.getPropertyValue('--button-size')};
            min-height: ${refButtonStyle.getPropertyValue('--button-size')};
            gap: 0.25rem;
            padding: 0 0.5rem;
            background: ${refButtonStyle.getPropertyValue('--button-background-color')};
            border: 1px solid ${refButtonStyle.getPropertyValue('--button-border-color')};
            border-radius: 4px;
            color: ${refButtonStyle.getPropertyValue('--button-text-color')};
            font-family: ${refButtonStyle.getPropertyValue('--font-sans')};
            font-size: ${refButtonStyle.getPropertyValue('--font-size-14')};
            line-height: normal;
            text-decoration: none;
            cursor: ${refButtonStyle.getPropertyValue('--cursor-pointer')};
            transition: 0.5s;
        }
    `));

    dialog.element.getElementsByClassName("dialog-content standard-form")[0].appendChild(style)

    console.log(dialog);

    dialogByIds = [...dialog.element.getElementsByTagName("*")]
        .reduce((acc, cur, _) => {
            if (cur.id) {
                acc[cur.id] = cur;
            }
            return acc;
        }, {});
    conditions.forEach(condition => {
        dialogByIds[condition.name].onclick = function () {
            printCondition(condition);
        }
    });
});