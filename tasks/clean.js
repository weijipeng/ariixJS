import gulp from 'gulp';
import del from 'del';
import args from './util/args';

gulp.task('clean',()=>{
//  return del(['server/public','server/views'])
	return del(['server/views'])
})
