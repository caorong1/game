import { _decorator, Component, Node, Sprite, UITransform, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BackgroundScroll')
export class BackgroundScroll extends Component {
    @property(Node)
    originalBg: Node = null;

    @property
    speed: number = 0; // 初始速度设为0

    private cloneBgs: Node[] = [];
    private bgWidth: number = 0;
    private timer: number = 0; // 计时器

    onLoad() {
        const uiTransform = this.originalBg.getComponent(UITransform);
        if (uiTransform) {
            this.bgWidth = uiTransform.contentSize.width;
        }

        const cloneBg = this.cloneBackground();
        this.cloneBgs.push(cloneBg);
        cloneBg.setPosition(this.originalBg.position.x + this.bgWidth, this.originalBg.position.y);
        this.moveClonesToBottom();
    }

    update(dt: number) {
        // 更新计时器并动态计算速度
        this.timer += dt;
        this.speed = 10 * this.timer + 200; // 速度随时间线性增加

        // 背景移动逻辑
        this.originalBg.x -= this.speed * dt;
        for (const cloneBg of this.cloneBgs) {
            cloneBg.x -= this.speed * dt;
        }

        // 重置背景位置
        if (this.originalBg.x <= -this.bgWidth) {
            this.originalBg.x += this.bgWidth * (this.cloneBgs.length + 1);
            this.moveClonesToBottom();
        }

        for (const cloneBg of this.cloneBgs) {
            if (cloneBg.x <= -this.bgWidth) {
                cloneBg.x += this.bgWidth * (this.cloneBgs.length + 1);
                this.moveClonesToBottom();
            }
        }
    }

    private cloneBackground(): Node {
        const newBg = instantiate(this.originalBg);
        newBg.setParent(this.node);
        return newBg;
    }

    private moveClonesToBottom() {
        for (const clone of this.cloneBgs) {
            clone.setSiblingIndex(0);
        }
    }
}    