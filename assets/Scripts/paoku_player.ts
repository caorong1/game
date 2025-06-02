import { _decorator, Component, Node, input, Input, EventKeyboard, macro, tween, v2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('paoku_player')
export class pao_player extends Component {
    @property(Node)
    playerNode: Node = null;

    @property
    jumpHeight: number = 200;

    @property
    jumpDuration: number = 0.3;

    private isJumping: boolean = false;

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: EventKeyboard) {
        if (event.keyCode === macro.KEY.w && !this.isJumping) {
            this.jump();
        }
    }

    jump() {
        this.isJumping = true;

        // ×ª³É Vec3 
        const startPos = new Vec3(
            this.playerNode.position.x,
            this.playerNode.position.y,
            this.playerNode.position.z
        );

        const jumpUp = tween(this.playerNode)
            .to(this.jumpDuration, { position: new Vec3(startPos.x, startPos.y + this.jumpHeight, startPos.z) }, { easing: 'cubicOut' });

        const jumpDown = tween(this.playerNode)
            .to(this.jumpDuration, { position: startPos }, { easing: 'cubicIn' });

        tween(this.playerNode)
            .sequence(jumpUp, jumpDown)
            .call(() => { this.isJumping = false; })
            .start();
    }
}