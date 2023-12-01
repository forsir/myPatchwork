import { PointData } from '../reducer/types';

function computeXY(a: number, b: number, angle: number) {
    const x = a * Math.sin(angle);
    const y = b * Math.cos(angle);
    return { x: Math.round(x), y: Math.round(y), angle };
}

function distributePointsOnEllipse(a: number, b: number, numPoints: number): PointData[] {
    const points = [];

    for (let i = 0; i < numPoints; i++) {
        const theta = (2 * Math.PI * i) / numPoints;
        points.push(computeXY(a, b, theta));
    }

    return points;
}

function getLength(x1: number, y1: number, x2: number, y2: number): number {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    return length;
}

function recomputePoint(a: number, b: number, points: PointData[], index: number): PointData {
    const count = points.length;
    index = index % count;

    const point = points[index];
    const pointPrev = points[(index - 1 + count) % count];
    const pointNext = points[(index + 1) % count];

    const lengthToPrev = getLength(point.x, point.y, pointPrev.x, pointPrev.y);
    const lengthToNext = getLength(point.x, point.y, pointNext.x, pointNext.y);

    const halfLength = (lengthToNext + lengthToPrev) / 2;
    const change = halfLength - lengthToPrev;
    const changePart = change / lengthToPrev;

    const angleChange = (point.angle - pointPrev.angle) * changePart;

    return computeXY(a, b, point.angle + angleChange);
}

function recompute(a: number, b: number, points: PointData[]): PointData[] {
    // we don't touch the first point
    for (let i = 1; i < points.length; i++) {
        points[i] = recomputePoint(a, b, points, i);
    }
    return points;
}

function finalTouch(x: number, y: number, points: PointData[]): PointData[] {
    points.forEach((p) => {
        p.x += x;
        p.y += y;
    });

    const last = points.pop();
    if (last) {
        points.unshift(last);
    }
    points[1].y = points[0].y;

    points[0].angle = 0;
    points[1].angle = 0;
    points[2].angle = 0;
    return points;
}

export function createEllipse(x: number, y: number, a: number, b: number, numPoints: number): PointData[] {
    let data = distributePointsOnEllipse(a, b, numPoints);

    for (let i = 0; i < 15; i++) {
        data = recompute(a, b, data);
    }

    return finalTouch(x, y, data);
}
