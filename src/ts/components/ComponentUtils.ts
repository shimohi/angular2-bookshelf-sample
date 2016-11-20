import {Point} from "./Point";

export class ComponentUtils {

	static getRelativeMousePoint(
		e: MouseEvent,
		targetElement?: Element
	): Point {

		// マウス位置を取得する
		const mouseX = e.pageX | 0;
		const mouseY = e.pageY | 0;

		// 要素の位置を取得
		const element = targetElement != null ? targetElement : <Element>e.target;
		const rect = element.getBoundingClientRect();

		// 要素の位置座標を計算
		const positionX = ( rect.left + window.pageXOffset ) | 0;
		const positionY = ( rect.top + window.pageYOffset ) | 0;

		// 要素の左上からの距離を計算
		return new Point(
			( mouseX - positionX ) | 0,
			( mouseY - positionY ) | 0
		);
	}
}

