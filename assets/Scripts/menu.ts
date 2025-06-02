import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Menu')
export class Menu extends Component {
    @property(Node)
    rule: Node = null;

    goRuleIntroduce() {
        this.rule.active = true;
    }

    returnMenu() {
        this.rule.active = false;
    }

    goPaoku() {
        director.loadScene("paoku");
    }
}